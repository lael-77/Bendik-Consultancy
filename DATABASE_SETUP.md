# Database Setup Summary - Diez Database

## ✅ All Tables Created Successfully!

All 7 main tables have been created in the `diez` database with all required fields.

---

## 📊 Tables and Their Purpose

### 1. **client_requests** (24 fields)
**Form:** `client-form.html`  
**Endpoint:** `POST /api/client-requests`

Stores general service requests from clients including:
- Client information (name, organization, contact details)
- Business details (type, location, TIN, National ID)
- Service requirements (services needed, urgency, dates)
- Payment and quotation preferences
- Insurance preferences

**Key Fields:**
- `fullName`, `organizationName`, `email`, `phoneNumber`
- `services`, `description`, `urgency`
- `paymentMode`, `requireQuotation`
- `signature`, `createdAt`

---

### 2. **pharmacy_purchase_requests** (26 fields)
**Form:** `purchase-pharmacy.html`  
**Endpoint:** `POST /api/pharmacy-purchase-requests`

Stores requests from buyers looking to purchase a pharmacy:
- Buyer information and contact details
- Purchase preferences (pharmacy type, location, budget)
- Business requirements (revenue, status, ownership)
- Timeline and support services needed

**Key Fields:**
- `buyerName`, `email`, `phoneNumber`
- `pharmacyType`, `preferredLocation`, `budgetRange`
- `clientSignature`, `date`
- `createdAt`

---

### 3. **pharmacy_sale_requests** (31 fields)
**Form:** `sell-pharmacy.html`  
**Endpoint:** `POST /api/pharmacy-sale-requests`

Stores listings from pharmacy owners wanting to sell:
- Owner and pharmacy information
- Business details (size, location, type)
- Financial information (price, revenue, debts)
- Inventory and equipment details
- Sale timeline and valuation needs

**Key Fields:**
- `ownerName`, `pharmacyName`, `email`, `phoneNumber`
- `location`, `price`, `salesRange`
- `date`, `signature`
- `createdAt`

---

### 4. **job_applications** (37 fields)
**Form:** `job-application.html`  
**Endpoint:** `POST /api/job-applications`

Stores job applications from pharmacists:
- Personal information (name, DOB, nationality, ID)
- Professional details (qualification, license, experience)
- Job preferences (position, schedule, location, salary)
- Work history and references
- Skills and availability

**Key Fields:**
- `fullName`, `email`, `phoneNumber`
- `position`, `qualification`, `experience`
- `salaryFrom`, `salaryTo`, `startDate`
- `signature`, `signatureDate`
- `createdAt`

---

### 5. **recruitment_requests** (42 fields)
**Form:** `recruitment-request.html`  
**Endpoint:** `POST /api/recruitment-requests`

Stores recruitment requests from employers:
- Pharmacy and contact information
- Position details (type, availability, employment type)
- Requirements (qualification, license, experience, skills)
- Job responsibilities and structure
- Compensation and benefits

**Key Fields:**
- `pharmacyName`, `contactPerson`, `email`, `phoneNumber`
- `position`, `positionsAvailable`, `employmentType`
- `salaryFrom`, `salaryTo`, `startDate`
- `signatureDate`, `signature`
- `createdAt`

---

### 6. **admins** (4 fields)
**Form:** `LoginForm.html`  
**Endpoint:** `POST /api/admin/login`

Stores admin user accounts for dashboard access:
- Admin email and hashed password
- Account creation timestamp

**Key Fields:**
- `id`, `email` (unique), `password`
- `created_at`

---

### 7. **payments** (8 fields)
**Endpoint:** `POST /api/pay`

Stores payment transaction records:
- Payment method and amount
- Currency and status
- Phone number and card reference
- Transaction timestamp

**Key Fields:**
- `method`, `amount`, `currency`
- `status`, `phone`, `cardRef`
- `createdAt`

---

## 🔄 Data Flow

```
User fills form → Frontend (localhost:3000)
                    ↓
            Submits to API (localhost:3001)
                    ↓
            Backend validates & saves
                    ↓
            Data stored in MySQL (diez database)
                    ↓
            Admin can view in dashboard
```

---

## 📝 Common Fields in All Request Tables

All request tables include:
- **Soft Delete Support:**
  - `isDeleted` (BOOLEAN) - Marks if record is deleted
  - `deletedAt` (TIMESTAMP) - When it was deleted
  
- **Timestamps:**
  - `createdAt` (TIMESTAMP) - When record was created

---

## 🧪 Testing

To test that forms are saving data:

1. **Open Frontend:** `http://localhost:3000`
2. **Fill any form** (e.g., Client Request Form)
3. **Submit the form**
4. **Check Database:**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Select `diez` database
   - Check the corresponding table
   - You should see your submitted data!

---

## 📋 Quick Reference

| Form | Table | Fields |
|------|-------|--------|
| Client Form | `client_requests` | 24 |
| Purchase Pharmacy | `pharmacy_purchase_requests` | 26 |
| Sell Pharmacy | `pharmacy_sale_requests` | 31 |
| Job Application | `job_applications` | 37 |
| Recruitment Request | `recruitment_requests` | 42 |
| Admin Login | `admins` | 4 |
| Payment | `payments` | 8 |

---

## ✅ Status

**Database:** `diez`  
**Tables Created:** 7/7  
**Status:** ✅ Ready for form submissions!

All tables are now ready to receive data from your forms! 🎉

