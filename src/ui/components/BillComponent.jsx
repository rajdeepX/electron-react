import  {  useState } from "react";
// import "./index.css";

const BillComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "Service",
    totalCost: "",
  });

  const [submitted, setSubmitted] = useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-container">
      {!submitted ? (
        
        <form className="invoice-form" onSubmit={handleSubmit}>
          <h2>Fill Invoice Details</h2>

          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />

          <label>Service Type:</label>
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="Service">Service</option>
            <option value="Repair">Repair</option>
            <option value="Queries">Queries</option>
          </select>

          <label>Total Cost (INR):</label>
          <input type="number" name="totalCost" value={formData.totalCost} onChange={handleChange} required />

          <button type="submit" className="submit-button">Generate Invoice</button>
        </form>
      ) : (
        
        <div className="invoice">
          <div className="invoice-header">
            <h1 className="invoice-title">INVOICE</h1>
            <button className="print-button" onClick={handlePrint}>Print</button>
          </div>

          <div className="billed-to">
            <p>Billed to:</p>
            <p style={{textTransform: "uppercase", fontWeight: "bold"}}>{formData.name}</p>
            <p>Ph.no. :{formData.phone}</p>
            <p>{formData.address}</p>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.service}</td>
                <td>${formData.totalCost}</td>
              </tr>
            </tbody>
          </table>

          <div className="invoice-total">
            <p><strong>Total: ₹{formData.totalCost}</strong></p>
          </div>

          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default BillComponent;
