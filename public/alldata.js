function AllData(){
  const [data, setData] = React.useState('');    

  React.useEffect(() => {
     const accounts = fetchAccounts()
     setData(accounts)
  }, []);

  return (<>
    <h5>All Data in Store:</h5>
    {JSON.stringify(data)}<br/>
</>);
}

function fetchAccounts(){
    // fetch all accounts from API
    fetch('/account/all')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              return (JSON.stringify(data));                
          });
}

module.exports = {
    fetchAccounts
}