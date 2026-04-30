from flask import Flask, render_template, make_response
import json
import os

app = Flask(__name__)

def load_data():
    file_path = os.path.join(app.root_path, 'data', 'azure_vms.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

db = load_data()

@app.route('/')
def index():
    return render_template('index.html', 
                           vms=db['vms'], 
                           regions=db['regions'], 
                           os_list=db['os'], 
                           disks=db['disks'],
                           sql=db['sql'],
                           support=db['support'],
                           hidden_costs=db.get('hidden_costs', {}))

@app.route('/calculadora-azure/<vm_id>')
def seo_vm_page(vm_id):
    vm = next((item for item in db['vms'] if item["id"] == vm_id), None)
    if vm:
        return render_template('seo_page.html', vm=vm, vms=db['vms'])
    return "Máquina não encontrada", 404

@app.route('/sitemap.xml')
def sitemap():
    pages = []
    base_url = "https://seusiteaqui.com" 
    pages.append(f"{base_url}/")
    for vm in db['vms']:
        pages.append(f"{base_url}/calculadora-azure/{vm['id']}")
    
    sitemap_xml = render_template('sitemap.xml', pages=pages)
    response = make_response(sitemap_xml)
    response.headers["Content-Type"] = "application/xml"
    return response

if __name__ == '__main__':
    app.run(debug=True)