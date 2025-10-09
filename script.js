let orders = JSON.parse(localStorage.getItem('orders') || '[]');
let orderCounter = orders.length + 1;
let adminPin = localStorage.getItem('adminPin') || '1234';

let logoClickCount = 0;
document.querySelector('.logo-section').addEventListener('click', ()=>{
    logoClickCount++;
    if(logoClickCount>=5){
        logoClickCount=0;
        let pin = prompt('Enter admin PIN');
        if(pin===adminPin) openAdmin();
        else alert('Wrong PIN');
    }
});

function openOrderModal(service, price){
    document.getElementById('modalService').innerText = service + ' - KSh '+price;
    document.getElementById('orderModal').style.display='flex';
    document.getElementById('orderModal').dataset.price = price;
    document.getElementById('orderModal').dataset.service = service;
}

function closeOrderModal(){
    document.getElementById('orderModal').style.display='none';
}

function submitOrder(e){
    e.preventDefault();
    const service = document.getElementById('orderModal').dataset.service;
    const price = parseFloat(document.getElementById('orderModal').dataset.price);
    const quantity = parseFloat(document.getElementById('orderQuantity').value);
    const total = price * quantity;
    const order = {
        id: `ORD-${orderCounter}`,
        service,
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        location: document.getElementById('customerLocation').value,
        quantity,
        total,
        status:'Pending'
    };
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    orderCounter++;
    closeOrderModal();
    updateOrdersList();
    document.getElementById('mpesaInfo').style.display='block';
}

function updateOrdersList(){
    const container = document.getElementById('ordersContainer');
    if(orders.length===0){container.innerHTML='<p>No orders yet.</p>'; return;}
    container.innerHTML='';
    orders.forEach(o=>{
        const div = document.createElement('div');
        div.innerHTML=`<strong>${o.service}</strong> x ${o.quantity} = KSh ${o.total} <br>
        ${o.name} | ${o.phone} | ${o.location} | Status: ${o.status}`;
        container.appendChild(div);
    });
}

// Admin
function openAdmin(){
    const admin = document.getElementById('adminSection');
    admin.style.display='block';
    renderAdminOrders();
    renderAdminServices();
}

function closeAdmin(){
    document.getElementById('adminSection').style.display='none';
}

function renderAdminOrders(){
    const adminOrders = document.getElementById('adminOrders');
    adminOrders.innerHTML='<h3>Orders</h3>';
    orders.forEach((o,i)=>{
        const div = document.createElement('div');
        div.innerHTML=`${o.id}: ${o.service} x ${o.quantity} - ${o.name} (${o.phone}) | Status: ${o.status}
        <button onclick="updateStatus(${i})">Next Status</button>
        <button onclick="deleteOrder(${i})">Delete</button>`;
        adminOrders.appendChild(div);
    });
}

function updateStatus(index){
    const statuses = ['Pending','Received','Almost Complete','Completed'];
    let current = statuses.indexOf(orders[index].status);
    current = (current+1)%statuses.length;
    orders[index].status = statuses[current];
    localStorage.setItem('orders', JSON.stringify(orders));
    renderAdminOrders();
    updateOrdersList();
}

function deleteOrder(index){
    orders.splice(index,1);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderAdminOrders();
    updateOrdersList();
}

function renderAdminServices(){
    const adminServices = document.getElementById('adminServices');
    adminServices.innerHTML='<h3>Services</h3>';
    const services = ['Hay','Ploughing','Transportation'];
    services.forEach((s,i)=>{
        const div = document.createElement('div');
        div.innerHTML=`${s} <input type="number" id="servicePrice${i}" value="${getServicePrice(s)}">
        <button onclick="updatePrice('${s}', ${i})">Update Price</button>`;
        adminServices.appendChild(div);
    });
}

function getServicePrice(name){
    const prices = JSON.parse(localStorage.getItem('servicePrices') || '{}');
    return prices[name] || (name==='Hay'?180:name==='Ploughing'?3500:8);
}

function updatePrice(name,index){
    const price = parseFloat(document.getElementById('servicePrice'+index).value);
    const prices = JSON.parse(localStorage.getItem('servicePrices') || '{}');
    prices[name]=price;
    localStorage.setItem('servicePrices', JSON.stringify(prices));
    alert(`${name} price updated to ${price}`);
}
