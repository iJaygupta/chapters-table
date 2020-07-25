var table = document.getElementById('maths');
var e = {
    create: function (element) {
        try {
            return document.createElement(element);
        } catch (err) { alert('Failed to load the script!') }
    }
};

var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:3000/api/book/maths', true)
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data = data.response;
        data.forEach((object) => {
            var tr = e.create('tr');
            var tr2 = e.create('tr');
            tr2.id = object.id + "temp";
            var td = e.create('td');
            td.id = object.id;
            td.addEventListener("click", ClickMe);
            td.innerHTML = object.title;
            var td2 = e.create('td');
            if(object.type=="chapter")
            td2.innerHTML = (object.completeCount / object.childrenCount * 100).toFixed(2)  + " %"; 
            else{
                td2.innerHTML = object.status; 
            }
            tr.appendChild(td);
            tr.appendChild(td2);
            table.appendChild(tr);
            table.appendChild(tr2);
           
        })

    } else {
        console.log('error');
    }
}

request.send();

function ClickMe(event){
   

    //get the element that is clicked
  var ele = event.target;
  
  //get the element id of the element that is clicked
  var eleId = ele.id;  
  var tr = document.getElementById(eleId+"temp");
 if(tr.innerHTML==""){
    request.open('GET', `http://localhost:3000/api/book/maths/section/${eleId}`, true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
       

        if (request.status >= 200 && request.status < 400) {
            data = data.response[eleId];
        
            var td = e.create('td');
         var div = e.create('div');
            var tb = e.create('table');
            var tr1 = e.create('tr');
            var th1 = e.create('th');
            var th2 = e.create('th');
            th1.innerHTML = "Lessons";
            th2.innerHTML = "Status" ;
            tr1.appendChild(th1);
            tr1.appendChild(th2);
            tb.appendChild(tr1);
            
            data.forEach((object) => {
                var tr = e.create('tr');
                var td = e.create('td');
                var td2 = e.create('td');
                td.innerHTML = object.title;
                td2.innerHTML = object.status
                tr.appendChild(td);
                tr.appendChild(td2);
                tb.appendChild(tr);
            }) 
            div.appendChild(tb);
            td.appendChild(div);
            tr.appendChild(td);
           
            var content = tr.firstChild;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
        } else {
            console.log('error');
            alert("No Lessons Found");
        }
    }
    
    request.send();
    
 }
 else{
    var content = tr.firstChild;
if (content.style.display === "block") {
content.style.display = "none";
} else {
content.style.display = "block";
}
 }
}




