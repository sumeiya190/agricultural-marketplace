import "./listProduce.css";

function ListProduce({onBack}) {
  return (
    <div className="list-produce-page">
      <div className="list-produce-card">
        <div className="page-navigation">
          <a href='#' onClick={(event) => { event.preventDefault(); onBack();}}>Back</a>
        </div>
        <div className="page-header">
          <h1>List Your Produce</h1>
          <p>Add your farm produce for buyers to discover.</p>
        </div>

        <form className="produce-form">
          <div className="form-group">
            <label>Produce Name</label>
            <input
              type="text"
              placeholder="e.g. Maize"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your produce..."
              rows="4"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="e.g. 50"
              />
            </div>

            <div className="form-group">
              <label>Price (KSh)</label>
              <input
                type="number"
                placeholder="e.g. 80"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. Eastleigh"
            />
          </div>

          <div className="form-group">
            <label>Produce Image</label>
            <input
              type="file"
              accept="image/*"
            />
            <small>
              Upload a clear image of your produce.
            </small>
          </div>

          <button type="submit" className="list-produce-button">
            List Produce
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListProduce;