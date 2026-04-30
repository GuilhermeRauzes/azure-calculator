document.addEventListener("DOMContentLoaded", () => {
    const refs = {
        vm: document.getElementById('vm-select'),
        region: document.getElementById('region-select'),
        billing: document.getElementById('billing-select'),
        os: document.getElementById('os-select'),
        ahbContainer: document.getElementById('ahb-container'),
        ahbCheck: document.getElementById('ahb-checkbox'),
        disk: document.getElementById('disk-select'),
        ip: document.getElementById('ip-select'),
        bw: document.getElementById('bw-input'),
        backup: document.getElementById('backup-input'),
        sql: document.getElementById('sql-select'),
        support: document.getElementById('support-select'),
        hours: document.getElementById('hours-input'),
        previewPrice: document.getElementById('preview-price'),
        btnAddCart: document.getElementById('btn-add-cart'),
        cartList: document.getElementById('cart-list'),
        totalPrice: document.getElementById('total-price'),
        symbol: document.getElementById('currency-symbol'),
        label: document.getElementById('currency-label'),
        btnUsd: document.getElementById('btn-usd'),
        btnBrl: document.getElementById('btn-brl'),
        note: document.getElementById('conversion-note'),
        btnExport: document.getElementById('btn-export'),
        btnCopyLink: document.getElementById('btn-copy-link'),
        ctx: document.getElementById('costChart')
    };

    let isBrl = false; 
    let brlRate = 5.00; 
    let architectureCart = []; 
    let chartInstance = null;

    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => { 
            if(data?.rates?.BRL) { brlRate = data.rates.BRL; renderCart(); updatePreview(); }
        })
        .catch(err => console.log("API Câmbio Error"));

    // === LÓGICA DO GRÁFICO CORRIGIDA E TURBINADA (Chart.js) ===
    function initOrUpdateChart(totals) {
        const rawData = [totals.compute, totals.os, totals.storage, totals.network, totals.paas, totals.backup, totals.support];
        const isPt = localStorage.getItem('appLang') === 'pt';
        const rawLabels = isPt 
            ? ['Compute', 'Licença SO', 'Discos', 'Rede/IP', 'PaaS (SQL)', 'Backup', 'Suporte'] 
            : ['Compute', 'OS License', 'Storage', 'Network', 'PaaS (SQL)', 'Backup', 'Support'];
        
        const backgroundColors = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6', '#64748b'];

        // Filtra para mostrar na legenda APENAS o que tem custo > 0
        const filteredLabels = [];
        const filteredData = [];
        const filteredColors = [];

        for(let i = 0; i < rawData.length; i++) {
            if(rawData[i] > 0) {
                filteredLabels.push(rawLabels[i]);
                filteredData.push(rawData[i]);
                filteredColors.push(backgroundColors[i]);
            }
        }

        const hasData = filteredData.length > 0;

        if (chartInstance) {
            chartInstance.data.labels = hasData ? filteredLabels : [isPt ? 'Arquitetura Vazia' : 'Empty Architecture'];
            chartInstance.data.datasets[0].data = hasData ? filteredData : [1]; 
            chartInstance.data.datasets[0].backgroundColor = hasData ? filteredColors : ['#cbd5e1'];
            
            // CORREÇÃO DO BUG: Força o tooltip e a legenda a ligarem novamente quando há dados
            chartInstance.options.plugins.tooltip.enabled = hasData;
            chartInstance.options.plugins.legend.display = hasData;
            
            chartInstance.update();
        } else {
            chartInstance = new Chart(refs.ctx, {
                type: 'doughnut',
                data: {
                    labels: hasData ? filteredLabels : [isPt ? 'Arquitetura Vazia' : 'Empty Architecture'],
                    datasets: [{
                        data: hasData ? filteredData : [1],
                        backgroundColor: hasData ? filteredColors : ['#cbd5e1'],
                        borderWidth: 2,
                        borderColor: 'transparent'
                    }]
                },
                options: {
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { 
                        // Agora a legenda aparece bonita embaixo do gráfico
                        legend: { 
                            display: hasData,
                            position: 'bottom',
                            labels: {
                                color: '#94a3b8',
                                font: { size: 11, family: "'Inter', sans-serif" },
                                usePointStyle: true,
                                padding: 15
                            }
                        }, 
                        tooltip: { 
                            enabled: hasData, 
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleFont: { family: "'Inter', sans-serif", size: 13 },
                            bodyFont: { family: "'Inter', sans-serif", size: 14, weight: 'bold' },
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: { 
                                label: (ctx) => ` ${ctx.label}: ${isBrl?'R$':'$'}${ctx.raw.toFixed(2)}` 
                            } 
                        } 
                    },
                    cutout: '65%'
                }
            });
        }
    }

    // === LÓGICA DE CÁLCULO E CARRINHO ===
    function checkAHB() {
        if (refs.os && refs.os.value === 'windows') refs.ahbContainer.classList.remove('hidden');
        else { refs.ahbContainer.classList.add('hidden'); refs.ahbCheck.checked = false; }
    }

    function getFormValues() {
        const vmOpt = refs.vm.options[refs.vm.selectedIndex];
        if (!vmOpt || vmOpt.value === "") return null;

        const basePrice = parseFloat(vmOpt.getAttribute('data-price')) || 0;
        const cpuCount = parseInt(vmOpt.getAttribute('data-cpu')) || 1;
        const regionMult = parseFloat(refs.region.options[refs.region.selectedIndex]?.getAttribute('data-mult')) || 1;
        const billingMult = parseFloat(refs.billing.value) || 1; 
        let osCorePrice = refs.ahbCheck.checked ? 0 : (parseFloat(refs.os.options[refs.os.selectedIndex]?.getAttribute('data-coreprice')) || 0);
        
        const diskPrice = parseFloat(refs.disk.options[refs.disk.selectedIndex]?.getAttribute('data-price')) || 0;
        const ipPrice = refs.ip.value === "1" ? parseFloat(refs.ip.getAttribute('data-price')) : 0;
        const bwAmount = parseFloat(refs.bw.value) || 0;
        const bwCost = bwAmount > 100 ? (bwAmount - 100) * parseFloat(refs.bw.getAttribute('data-price')) : 0;
        
        const sqlOpt = refs.sql.options[refs.sql.selectedIndex];
        const sqlPrice = parseFloat(sqlOpt?.getAttribute('data-price')) || 0;
        
        const backupGB = parseFloat(refs.backup.value) || 0;
        const backupCost = backupGB * parseFloat(refs.backup.getAttribute('data-price'));
        
        const supportPrice = parseFloat(refs.support.options[refs.support.selectedIndex]?.getAttribute('data-price')) || 0;

        const timeRatio = (parseInt(refs.hours.value) || 0) / 730; 

        return {
            id: Date.now().toString(),
            name: vmOpt.text,
            details: `${refs.region.options[refs.region.selectedIndex].text} | ${refs.os.options[refs.os.selectedIndex].text}`,
            costs: {
                compute: (basePrice * regionMult * billingMult) * timeRatio,
                os: (osCorePrice * cpuCount) * timeRatio,
                storage: diskPrice,
                network: ipPrice + bwCost,
                paas: sqlPrice,
                backup: backupCost,
                support: supportPrice 
            }
        };
    }

    function updatePreview() {
        checkAHB();
        const item = getFormValues();
        if (!item) { refs.previewPrice.textContent = "$0.00"; refs.btnAddCart.disabled = true; return; }
        refs.btnAddCart.disabled = false;
        
        let total = Object.values(item.costs).reduce((a, b) => a + b, 0);
        if (isBrl) total *= brlRate;
        refs.previewPrice.textContent = `${isBrl ? 'R$' : '$'} ${total.toFixed(2)}`;
    }

    refs.btnAddCart.addEventListener('click', () => {
        const item = getFormValues();
        if (item) {
            architectureCart.push(item);
            renderCart();
            saveToURL(); 
        }
    });

    window.removeFromCart = function(id) {
        architectureCart = architectureCart.filter(item => item.id !== id);
        renderCart();
        saveToURL();
    };

    function renderCart() {
        const isPt = localStorage.getItem('appLang') === 'pt';
        refs.cartList.innerHTML = '';
        
        if (architectureCart.length === 0) {
            refs.cartList.innerHTML = `<p class="text-sm text-slate-400 italic text-center mt-6">${isPt ? 'Arquitetura vazia.' : 'Empty architecture.'}</p>`;
            refs.totalPrice.textContent = "0.00";
            refs.btnExport.disabled = true; refs.btnCopyLink.disabled = true;
            initOrUpdateChart({compute:0, os:0, storage:0, network:0, paas:0, backup:0, support:0});
            return;
        }

        refs.btnExport.disabled = false; refs.btnCopyLink.disabled = false;
        let globalTotal = 0;
        let chartTotals = {compute:0, os:0, storage:0, network:0, paas:0, backup:0, support:0};

        architectureCart.forEach(item => {
            let itemSum = 0;
            for(let key in item.costs) {
                let cost = item.costs[key] * (isBrl ? brlRate : 1);
                itemSum += cost;
                chartTotals[key] += cost;
            }
            globalTotal += itemSum;

            const div = document.createElement('div');
            div.className = "flex justify-between items-center bg-white dark:bg-slate-700 p-3 rounded border border-slate-200 dark:border-slate-600 shadow-sm transition-all";
            div.innerHTML = `
                <div class="flex-grow overflow-hidden">
                    <h5 class="text-sm font-bold text-slate-800 dark:text-white truncate">${item.name}</h5>
                    <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${item.details}</p>
                </div>
                <div class="flex items-center gap-3 ml-2">
                    <span class="text-sm font-black text-blue-600 dark:text-blue-400 whitespace-nowrap">${isBrl?'R$':'$'}${itemSum.toFixed(2)}</span>
                    <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            refs.cartList.appendChild(div);
        });

        refs.totalPrice.textContent = globalTotal.toFixed(2);
        initOrUpdateChart(chartTotals);
    }

    // === URL E ESTADOS ===
    function saveToURL() {
        const params = new URLSearchParams();
        params.set('cur', isBrl ? 'BRL' : 'USD');
        if (architectureCart.length > 0) {
            const jsonStr = JSON.stringify(architectureCart);
            const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
            params.set('arch', base64);
        }
        window.history.replaceState(null, '', '?' + params.toString());
    }

    function loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        if(params.get('cur') === 'BRL') { isBrl = true; updateCurrencyUI(); }
        
        const archStr = params.get('arch');
        if (archStr) {
            try {
                const jsonStr = decodeURIComponent(escape(atob(archStr)));
                architectureCart = JSON.parse(jsonStr);
                renderCart();
            } catch (e) { console.error("URL Invalida", e); }
        }
    }

    function updateCurrencyUI() {
        refs.btnBrl.className = isBrl ? "px-4 py-2 rounded bg-white text-blue-800 shadow" : "px-4 py-2 rounded text-white hover:bg-white/10 transition";
        refs.btnUsd.className = !isBrl ? "px-4 py-2 rounded bg-white text-blue-800 shadow" : "px-4 py-2 rounded text-white hover:bg-white/10 transition";
        refs.label.textContent = isBrl ? (localStorage.getItem('appLang')==='pt'?"Reais (BRL) / mês":"Reais (BRL) / month") : (localStorage.getItem('appLang')==='pt'?"Dólares (USD) / mês":"Dollars (USD) / month");
        isBrl ? refs.note.classList.remove('hidden') : refs.note.classList.add('hidden');
    }

    // === EXPORTADORES ===
    refs.btnExport.addEventListener('click', () => {
        const isPt = localStorage.getItem('appLang') === 'pt';
        let csv = isPt ? "Recurso,Detalhes,Compute,SO,Armazenamento,Rede,SQL PaaS,Backup,Suporte,TOTAL\n" 
                       : "Resource,Details,Compute,OS,Storage,Network,SQL PaaS,Backup,Support,TOTAL\n";
        
        architectureCart.forEach(item => {
            const row = [
                `"${item.name}"`, `"${item.details}"`,
                item.costs.compute.toFixed(2), item.costs.os.toFixed(2), item.costs.storage.toFixed(2),
                item.costs.network.toFixed(2), item.costs.paas.toFixed(2), item.costs.backup.toFixed(2), item.costs.support.toFixed(2),
                Object.values(item.costs).reduce((a,b)=>a+b,0).toFixed(2)
            ];
            csv += row.join(",") + "\n";
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "azure_architecture.csv";
        link.click();
    });

    refs.btnCopyLink.addEventListener('click', () => {
        const link = window.location.href;
        const textArea = document.createElement("textarea"); textArea.value = link;
        document.body.appendChild(textArea); textArea.select();
        document.execCommand('copy'); document.body.removeChild(textArea);
        
        const originalText = refs.btnCopyLink.innerHTML;
        const isPt = localStorage.getItem('appLang') === 'pt';
        refs.btnCopyLink.innerHTML = `<i class="fa-solid fa-check text-green-500"></i> ${isPt ? 'Copiado!' : 'Copied!'}`;
        setTimeout(() => refs.btnCopyLink.innerHTML = originalText, 2000);
    });

    // === LISTENERS ===
    refs.btnUsd.addEventListener('click', () => { isBrl = false; updateCurrencyUI(); updatePreview(); renderCart(); saveToURL(); });
    refs.btnBrl.addEventListener('click', () => { isBrl = true; updateCurrencyUI(); updatePreview(); renderCart(); saveToURL(); });

    [refs.vm, refs.region, refs.os, refs.disk, refs.ip, refs.bw, refs.backup, refs.sql, refs.support, refs.hours, refs.billing, refs.ahbCheck].forEach(el => {
        if (el) { el.addEventListener('change', updatePreview); if(el.tagName === 'INPUT') el.addEventListener('input', updatePreview); }
    });

    window.addEventListener('languageChanged', (e) => {
        updateCurrencyUI(); renderCart(); 
    });

    loadFromURL();
    updatePreview();
    initOrUpdateChart({compute:0, os:0, storage:0, network:0, paas:0, backup:0, support:0});
});