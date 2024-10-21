

const dbPromiseTour = new Promise((resolve, reject) => {
    const request = indexedDB.open("IDBDatabaseTour", 1);

    request.onerror = function (event) {
        console.error("خطأ في فتح قاعدة البيانات:", event);
        reject(event.target.error);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("تم فتح قاعدة البيانات بنجاح");
        resolve(db);
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        const doctorStore = db.createObjectStore("tour", {
        keyPath: "id",
        autoIncrement: true,
        });
        doctorStore.createIndex("date", "date", {
        unique: false,
        });


    }

})


function fetchTour() {
    dbPromiseTour.then((db) => {
        const transaction = db.transaction('tour', 'readonly');
        const doctorObjectStore = transaction.objectStore('tour');

        const dentistDoctors = doctorObjectStore.getAll();

        dentistDoctors.onsuccess = function (event) {
            console.log(event.target.result)

            let dataCTour = event.target.result
            console.log(dataCTour)

       
            document.getElementById("totalTours").innerHTML = dataCTour.length
            displayTours(event.target.result)
        };

        dentistDoctors.onerror = function (event) {
            console.error("حدث خطأ في جلب دكاترة الأسنان:", event.target.error);
        };
    }).catch((error) => {
        console.error("خطأ في فتح قاعدة البيانات:", error);
    });
}
fetchTour();






// Function to add a new tour
function addTour() {
    const tourName = document.getElementById("tourName").value;
    const tourDate = document.getElementById("tourDate").value;
    const tourPeople = document.getElementById("tourPeople").value;
    const tourPrice = document.getElementById("tourPrice").value;

    if (!tourName || !tourPeople || !tourPrice || !tourDate ) {
        alert("Please fill out all fields.");
        return;
    }

    dbPromiseTour.then((db) => {
        const transaction = db.transaction("tour", "readwrite");
        const clientStore = transaction.objectStore("tour");

    // إنشاء كائن يحتوي على جميع القيم المطلوبة
    const tour = { 
        name: tourName, 
        date: tourDate, 
        people: tourPeople,
        price: tourPrice,
    };
    
        const addRequest = clientStore.add(tour); // استخدم add لإضافة بيانات جديدة دائماً
        addRequest.onsuccess = function () {
            console.log("تمت إضافة العميل بنجاح:", tour);
            // displayTours(tour)
        };

        addRequest.onerror = function (event) {
            console.error("خطأ في إضافة العميل:", event.target.error);
        };
    });


}

// check if the date of Tour exists or not and if it exists allow him to add registraion to the tour and if not print a massege said sorry  this tour does not exist , please add a diffrent date 
function checkTour(){
    const tourDate = document.getElementById("date").value;
    dbPromiseTour.then((db) => {
        const transaction = db.transaction('tour', 'readonly');
        const doctorObjectStore = transaction.objectStore('tour');
        const dentistDoctors = doctorObjectStore.getAll();
        dentistDoctors.onsuccess = function (event) {
            let dataCTour = event.target.result
            console.log(dataCTour)
            let found = false;
            dataCTour.forEach(element => {
                if (element.date === tourDate) {
                    found = true
                }
            });
            if (found) {
                alert("Good!, this tour exsits")

            } else {
                alert("Sorry this tour does not exist, please add a different date.")
            }

        }
    })
}




// Function to display the Tour
function displayTours(tours) {
 
        tours.map(tour => {
            const card = document.createElement("div");
            card.className = "card-show";

            const cardBody = document.createElement("div");
            cardBody.className = "small-card-body";

            const title = document.createElement("h3");
            title.className = "card-title";
            title.textContent = tour.name;

            const date = document.createElement("p");
            date.className = "card-date";
            date.textContent = `Date: ${tour.date}`;

            const people = document.createElement("p");
            people.className = "card-people";
            people.textContent = `People: ${tour.people}`;

            const price = document.createElement("p");
            price.className = "card-price";
            price.textContent = `${tour.price} EGP`;

            cardBody.appendChild(title);
            cardBody.appendChild(date);
            cardBody.appendChild(people);
            cardBody.appendChild(price);

            // إنشاء زر التحديث والحذف
            const cardActions = document.createElement("div");
            cardActions.className = "card-show-actions";

            // تعريف زر التعديل
            const editBtn = document.createElement("button");
            editBtn.className = "refresh-btn";
            editBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
           

            // تعريف زر الحذف
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
           
            // إضافة الأزرار إلى cardActions
            cardActions.appendChild(editBtn);
            cardActions.appendChild(deleteBtn);

            // إضافة محتويات البطاقة والأزرار إلى البطاقة الرئيسية
            card.appendChild(cardBody);
            card.appendChild(cardActions);

            // إضافة البطاقة إلى القائمة
            document.getElementById("cardList").appendChild(card);
        })
}

// ===========================================================================================================
// Function to update statistics
function updateStatistics() {
    
   
    const tourTransaction = db.transaction(["tour"], "readonly");
    const tourStore = tourTransaction.objectStore("tour");
    const tourRequest = tourStore.count();

    tourRequest.onsuccess = function(event) {
        const rahem = event.target.result;
        console.log(event.target.result);
        
        document.getElementById("totalTours").innerHTML = rahem; // Update total students count
    }
    

}


