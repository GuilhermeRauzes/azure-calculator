const dict = {
    pt: {
        nav_calc: "Calculadora",
        title_est: "Estimador de Arquitetura",
        sub_est: "Construa sua infraestrutura: VM, Rede, PaaS e Backup.",
        lbl_vm: "Máquina (Tamanho)",
        opt_vm: "Escolha a VM...",
        lbl_reg: "Região (Data Center)",
        lbl_bill: "Plano de Pagamento",
        opt_payg: "Pay-as-you-go (Sem desconto)",
        opt_1yr: "Reservado 1 Ano (~40% desc. compute)",
        opt_3yr: "Reservado 3 Anos (~60% desc. compute)",
        lbl_os: "Sistema Operacional",
        lbl_ahb: "Aplicar Azure Hybrid Benefit",
        lbl_disk: "Armazenamento Extra",
        lbl_hrs: "Horas de uso / Mês",
        lbl_net: "Rede, Backup e Serviços",
        lbl_ip: "IP Público Estático",
        lbl_bw: "Tráfego de Saída (GB/mês)",
        desc_bw: "Primeiros 100GB gratuitos",
        lbl_backup: "Tamanho do Backup (GB)",
        desc_bkp: "Custo por armazenamento Vault",
        lbl_sql: "Banco de Dados (PaaS)",
        lbl_support: "Plano de Suporte Microsoft",
        title_tot: "Orçamento Total da Arquitetura",
        lbl_usd: "Dólares (USD) / mês",
        lbl_brl: "Reais (BRL) / mês",
        note_conv: "Câmbio aplicado",
        btn_add_cart: "Adicionar à Arquitetura",
        cart_empty: "Sua arquitetura está vazia. Adicione recursos acima.",
        cart_title: "Recursos Adicionados:",
        btn_exp: "Baixar Relatório (CSV)",
        btn_copy: "Copiar Link (Arquitetura Completa)",
        seo_guides: "Guias de Preços por Instância",
        seo_desc: "Explore o detalhamento de custos mensais e especificações técnicas das instâncias mais pesquisadas.",
        seo_h1: "Custo Mensal da Máquina",
        seo_p1: "A instância",
        seo_p2: "da Microsoft Azure (categoria",
        seo_p3: ") vem equipada com",
        seo_p4: "e",
        seo_p5: "de Memória RAM.",
        seo_p6: "Para uma carga de trabalho rodando 24 horas por dia, 7 dias por semana (aproximadamente 730 horas mensais), o custo base estimado é de",
        seo_p7: "por mês.",
        seo_btn: "Ir para a Calculadora Completa",
        seo_cpu: "Processamento",
        seo_ram: "Memória RAM",
        seo_tier: "Série / Família",
        seo_cost: "Custo Total / Mês",
        
        // As 10 Regiões
        opt_eastus: "East US (Mais Barato)",
        opt_eastus2: "East US 2",
        opt_westus2: "West US 2",
        opt_northeurope: "North Europe",
        opt_westeurope: "West Europe",
        opt_uksouth: "UK South",
        opt_centralindia: "Central India",
        opt_southeastasia: "Southeast Asia",
        opt_australiaeast: "Australia East",
        opt_brazilsouth: "Brazil South",
        
        opt_linux: "Linux (Ubuntu/CentOS)",
        opt_windows: "Windows Server 2022",
        opt_none: "Apenas Disco do SO",
        opt_e10: "Standard HDD 128GB (E10)",
        opt_p4: "Premium SSD 32GB (P4)",
        opt_p10: "Premium SSD 128GB (P10)",
        opt_p15: "Premium SSD 256GB (P15)",
        opt_ip_no: "Não (Interno)",
        opt_ip_yes: "Sim (+ $3.65/mês)",
        opt_sql_none: "Nenhum Banco (IaaS)",
        opt_sql_s0: "Azure SQL S0 (10 DTUs)",
        opt_sql_s2: "Azure SQL S2 (50 DTUs)",
        opt_sql_vcore: "SQL Managed Gen5 (2 vCore)",
        opt_sup_basic: "Basic (Gratuito)",
        opt_sup_dev: "Developer",
        opt_sup_std: "Standard",
        footer_copy: "© 2026 AzureCalc Pro. Projeto Independente."
    },
    en: {
        nav_calc: "Calculator",
        title_est: "Architecture Estimator",
        sub_est: "Build your infra: VM, Network, PaaS and Backup.",
        lbl_vm: "Virtual Machine (Size)",
        opt_vm: "Select VM...",
        lbl_reg: "Region (Data Center)",
        lbl_bill: "Billing Plan",
        opt_payg: "Pay-as-you-go (No discount)",
        opt_1yr: "1-Year Reserved (~40% disc.)",
        opt_3yr: "3-Year Reserved (~60% disc.)",
        lbl_os: "Operating System",
        lbl_ahb: "Apply Azure Hybrid Benefit",
        lbl_disk: "Extra Storage",
        lbl_hrs: "Hours of use / Month",
        lbl_net: "Network, Backup & Services",
        lbl_ip: "Static Public IP",
        lbl_bw: "Outbound Traffic (GB/month)",
        desc_bw: "First 100GB free",
        lbl_backup: "Backup Size (GB)",
        desc_bkp: "Vault storage cost",
        lbl_sql: "Database (PaaS)",
        lbl_support: "Microsoft Support Plan",
        title_tot: "Total Architecture Budget",
        lbl_usd: "Dollars (USD) / month",
        lbl_brl: "Reais (BRL) / month",
        note_conv: "Exchange rate applied",
        btn_add_cart: "Add to Architecture",
        cart_empty: "Your architecture is empty. Add resources above.",
        cart_title: "Added Resources:",
        btn_exp: "Download Report (CSV)",
        btn_copy: "Copy Link (Full Architecture)",
        seo_guides: "Instance Pricing Guides",
        seo_desc: "Explore the breakdown of monthly costs and technical specifications for the most searched instances.",
        seo_h1: "Monthly Cost for",
        seo_p1: "The",
        seo_p2: "instance from Microsoft Azure (",
        seo_p3: " category) comes equipped with",
        seo_p4: "and",
        seo_p5: "of RAM.",
        seo_p6: "For a workload running 24/7 (approximately 730 hours per month), the estimated base cost is",
        seo_p7: "per month.",
        seo_btn: "Go to Full Calculator",
        seo_cpu: "Processing",
        seo_ram: "RAM Memory",
        seo_tier: "Series / Family",
        seo_cost: "Total Cost / Month",
        
        // As 10 Regiões
        opt_eastus: "East US (Cheapest)",
        opt_eastus2: "East US 2",
        opt_westus2: "West US 2",
        opt_northeurope: "North Europe",
        opt_westeurope: "West Europe",
        opt_uksouth: "UK South",
        opt_centralindia: "Central India",
        opt_southeastasia: "Southeast Asia",
        opt_australiaeast: "Australia East",
        opt_brazilsouth: "Brazil South",
        
        opt_linux: "Linux (Ubuntu/CentOS)",
        opt_windows: "Windows Server 2022",
        opt_none: "OS Disk Only",
        opt_e10: "Standard HDD 128GB (E10)",
        opt_p4: "Premium SSD 32GB (P4)",
        opt_p10: "Premium SSD 128GB (P10)",
        opt_p15: "Premium SSD 256GB (P15)",
        opt_ip_no: "No (Internal)",
        opt_ip_yes: "Yes (+ $3.65/month)",
        opt_sql_none: "No Database (IaaS)",
        opt_sql_s0: "Azure SQL S0 (10 DTUs)",
        opt_sql_s2: "Azure SQL S2 (50 DTUs)",
        opt_sql_vcore: "SQL Managed Gen5 (2 vCore)",
        opt_sup_basic: "Basic (Free)",
        opt_sup_dev: "Developer",
        opt_sup_std: "Standard",
        footer_copy: "© 2026 AzureCalc Pro. Independent Project."
    }
};

let currentLang = localStorage.getItem('appLang') || (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('appLang', lang);
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[lang][key]) {
            if(el.tagName === 'INPUT' && el.type === 'placeholder') el.placeholder = dict[lang][key];
            else el.textContent = dict[lang][key];
        }
    });
    const langBtn = document.getElementById('lang-toggle-text');
    if (langBtn) langBtn.textContent = lang === 'pt' ? 'PT-BR' : 'EN-US';
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => applyLanguage(currentLang === 'pt' ? 'en' : 'pt'));
});