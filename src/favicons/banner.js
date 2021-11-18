let bannerdata={}

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    let data=req.responseText;
    data=JSON.parse(data);
    bannerdata=data;
    getData(bannerdata);
   };
}
req.open("GET", "https://api.jsonbin.io/b/619470a001558c731cc3afae/latest", true);
req.setRequestHeader("X-Master-Key", "$2b$10$AqjBU.xui4GAkXVjCFUlcuWvdDLC1.mFSkQqUqWBKP0.qYzkFaF5y");
req.send();

function getData(value){
   bannerdata=value;
   console.log(bannerdata);
}