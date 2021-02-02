import './App.css';
import TemplateTable from '../TemplateTable/TemplateTable';


function App() {
  return (
    <div className="App">
      <div className="table_container">
        <div className="market">
          <TemplateTable title="Market" table_key= "market_keys" />
        </div>
      </div>
    </div>
  );
}

export default App;