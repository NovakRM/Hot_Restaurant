// Dependencies
let express = require("express");
let path = require("path");
let fs = require('fs');
const { json } = require("express");

// initiate Express and set the Port 
var app = express();
var PORT = process.env.PORT || 8080;

// connect express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//array objects 
let tables = []
let waitList = []

//Routing 
//GETs 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./home.html"));
  });

app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "./home.html"));
  });

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "./reserve.html"));
  });

app.get("/api/tables", function(req, res) {
    res.json(tables);
  });

app.get("/api/waitList", function(req, res) {
    res.json(waitList);
  });

app.get("/tables", function(req, res) {
    fs.writeFile("./tables.html",
    
    //template starts here 
            //${showTables()}
            //${showWaitList()}
    `
                <head>
                <meta charset="UTF-8">
                <title>Tables Page</title>
            
                <!-- Latest compiled and minified CSS & JS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
                <script src="https://code.jquery.com/jquery.js"></script>
                <script src="https://use.fontawesome.com/a590d3a2e5.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            
            </head>
            <body>

                <div class="container">
            
                <div class="jumbotron">
                    <h1 class="text-center"><i class="fa fa-fire"></i> Hot Restaurant</h1>
                    <hr>
                    <h2 class="text-center">Current Reservations and Waiting List</h2>
                    <br>
            
                    <div class="text-center">
                    <a href="/reserve"><button class="btn btn-lg btn-danger"><i class="fa fa-credit-card"></i> Make Reservation</button></a>
                    <a href="/"><button class="btn btn-lg btn-default"><i class="fa fa-home"></i></button></a>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                        <h4>Current Reservations</h4>
                        </div>
                        <div class="card-body">
                        ${showTables()}
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-header">
                        <h4>Waiting List</h4>
                        </div>
                        <div class="card-body">
                        ${showWaitList()}
                        </div>
                    </div>
                    </div>
                </div>
            
            
                <footer class="footer mt-4">
                    <div class="container">
                    <p><a href="#" id="clear">Clear Table</a> | <a href="/api/tables">API Table Link</a> | <a href="/api/waitlist">API
                        Wait List</a>
                    </p></div>
                </footer>
            
                </div>
            <script>

            </script>
            </body>
    `
    //template ends here 
   
    )
    res.sendFile(path.join(__dirname, "./tables.html"));
  });

//Card Build Functions 
function showTables(){
    if (tables){
      let currentTables = [] 
        for (let i=0;i<tables.length; i++){
            currentTables.push(
            `
            <ul id="tableList" class="list-group"><li class="list-group-item mt-4"><h2>Table #1</h2><hr><h2>ID: ${table[i].id}</h2><h2>Name: ${table[i].name}</h2><h2>Email: ${table[i].email}</h2><h2>Phone: ${table[i].phone}</h2></li></ul>
            
            `)
        }
    }
    return currentTables.join('')
}

function showWaitList(){
    if (waitList){
      let currentList = [] 
        for (let i=0;i<waitList.length; i++){
            currentList.push(
            `
            <ul id="waitList" class="list-group"><li class="list-group-item mt-4"><h2>Table #1</h2><hr><h2>ID: ${waitList[i].id}</h2><h2>Name: ${waitList[i].name}</h2><h2>Email: ${waitList[i].email}</h2><h2>Phone: ${waitList[i].phone}</h2></li></ul>
            
            `)
        }
    }
    return currentList.join('')
}


//POSTs
app.post("/api/tables", function(req, res) {
    let tableRequest = req.body;
    console.log(tableRequest);
    if (tables.length<= 5){
        tables.push(tableRequest)
    }else{
        waitList.push(tableRequest)
    }
    // newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase()
    // fs.readFile("./db/db.json", 'utf-8',(err,data)=>{
    //   let oldNote = JSON.parse(data)
    //   //console.log(oldNote)
    //   oldNote.notes.push(newNote)
    //   fs.writeFile("./db/db.json", JSON.stringify(oldNote), ()=>{})
    //   res.json(newNote);
    // })
    res.json(tableRequest);
  });

//DELETEs
app.delete("/api/clearTables", function(req,res){
    tables = []
    waitList = []
    fs.writeFile("./tables.html",  
    //template starts here 
    `
                <head>
                <meta charset="UTF-8">
                <title>Tables Page</title>
            
                <!-- Latest compiled and minified CSS & JS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
                <script src="https://code.jquery.com/jquery.js"></script>
                <script src="https://use.fontawesome.com/a590d3a2e5.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            
            </head>
            <body>

                <div class="container">
            
                <div class="jumbotron">
                    <h1 class="text-center"><i class="fa fa-fire"></i> Hot Restaurant</h1>
                    <hr>
                    <h2 class="text-center">Current Reservations and Waiting List</h2>
                    <br>
            
                    <div class="text-center">
                    <a href="/reserve"><button class="btn btn-lg btn-danger"><i class="fa fa-credit-card"></i> Make Reservation</button></a>
                    <a href="/"><button class="btn btn-lg btn-default"><i class="fa fa-home"></i></button></a>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                        <h4>Current Reservations</h4>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-header">
                        <h4>Waiting List</h4>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>
                    </div>
                </div>
            
            
                <footer class="footer mt-4">
                    <div class="container">
                    <p><a href="#" id="clear">Clear Table</a> | <a href="/api/tables">API Table Link</a> | <a href="/api/waitlist">API
                        Wait List</a>
                    </p></div>
                </footer>
            
                </div>
            <script>

            </script>
            </body>
    `
    //template ends here 
   
    )
    res.sendFile(path.join(__dirname, "./tables.html"));
})



  //Start server listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  