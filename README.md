# Chrisma Holdings Web App

**Chrisma Holdings** is a simple web-based app for ordering hay, ploughing, and transportation services. It includes a client interface and a PIN-protected admin panel for managing orders and service prices.  

## Features

### Client Side
- Large, stylish **gold & green italicized logo** with tagline *"Quality supply of hay"*  
- Dark green background with modern service cards  
- Services available:  
  - **Hay** (KSh 180 per bale)  
  - **Ploughing** (KSh 3500 per acre)  
  - **Transportation** (KSh 8 per bale)  
- Click **Order/Book/Request** to enter:  
  - Name  
  - Phone number  
  - Location  
  - Quantity  
- Automatic **total calculation** per order  
- **Order tracking** in the "My Orders" section  
- After ordering, **M-Pesa payment info** is displayed  

### Admin Side
- Accessible by **clicking the logo 5 times** and entering a **PIN** (default: `1234`)  
- Admin can:  
  - View all orders  
  - Delete orders  
  - Update order status (`Pending → Received → Almost Complete → Completed`)  
  - Change service prices  

---

## Installation & Usage

1. **Download or clone** the repository.  
2. Open the folder and **click on `index.html`** in a browser.  
3. Client workflow:  
   - Click a service card → fill order form → submit  
   - See the order appear in "My Orders" section  
4. Admin workflow:  
   - Click the **logo 5 times** → enter PIN → access admin panel  
   - Update orders or prices as needed  

---

## Files Included

- `index.html` → Main interface  
- `style.css` → App styling  
- `script.js` → Functionality and admin logic  
- `manifest.json` → appearance

---

## Notes

- Orders and prices are stored locally in your browser (using `localStorage`)  
- You can change the admin PIN in the admin panel; the new PIN is saved locally  
- No backend is required; this is a **pure front-end app**  
- Compatible with modern browsers (Chrome, Edge, Firefox)  

---

## Future Enhancements

- Integration with a backend for permanent storage  
- Online payment integration with M-Pesa  
- Responsive mobile layout for easier use on phones  

created by MARY WAITHERA
