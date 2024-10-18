

const dbPromiseRegistration = new Promise((resolve, reject) => {
    const request = indexedDB.open("IDBDatabaseRegistration", 1);

    request.onerror = function (event) {
        console.error("خطأ في فتح قاعدة البيانات:", event);
        reject(event.target.error);
    };

    request.onsuccess = function (event) {
        dbd = event.target.result;
        console.log("تم فتح قاعدة البيانات بنجاح");
        resolve(dbd);
    };

    request.onupgradeneeded = function (event) {
        dbd = event.target.result;
        const doctorStore = dbd.createObjectStore("registration", {
        keyPath: "id",
        autoIncrement: true,
        });
        doctorStore.createIndex("date", "date", {
        unique: false,
        });


    }

})


function fetchregistration() {
    dbPromiseRegistration.then((db) => {
        const transaction = db.transaction('registration', 'readonly');
        const doctorObjectStore = transaction.objectStore('registration');

        const dentistDoctors = doctorObjectStore.getAll();

        dentistDoctors.onsuccess = function (event) {
            console.log(event.target.result)

        let dataRegistration = event.target.result

       
            document.getElementById("totalRegistrations").innerHTML = dataRegistration.length
            displayRegistrations(event.target.result)
        };

        dentistDoctors.onerror = function (event) {
            console.error("حدث خطأ في جلب دكاترة الأسنان:", event.target.error);
        };
    }).catch((error) => {
        console.error("خطأ في فتح قاعدة البيانات:", error);
    });
}
fetchregistration();






// Function to add a new tour
function addRegistration() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;;
    const phone = document.getElementById('phone').value;;
    const dateTour = document.getElementById('date').value;;
    const Numberofticket = document.getElementById('number').value;;
    const message = document.getElementById('message').value;;

    if (!dateTour||!Numberofticket||!message||!dateTour||!name||!phone ||!email) {
        alert("Please fill out all fields.");
        return;
    }


    dbPromiseRegistration.then((db) => {
        const transaction = db.transaction("registration", "readwrite");
        const registrationStore = transaction.objectStore("registration");

    // إنشاء كائن يحتوي على جميع القيم المطلوبة
    const registration = { 
        name: name,
        email: email,
        phone: phone,
        date: dateTour,
        Numberofticket: Numberofticket,
        message: message
    };

        const addRequest = registrationStore.add(registration); // استخدم add لإضافة بيانات جديدة دائماً
        addRequest.onsuccess = function () {
            console.log("تمت إضافة العميل بنجاح:", registration);
           
            // displayRegistrations(registration)
        };

        addRequest.onerror = function (event) {
            console.error("خطأ في إضافة العميل:", event.target.error);
        };
    });


}
// Function to display the registrations
function displayRegistrations(registrations) {


    registrations.map(registration => {
        const card = document.createElement("div");
        card.className = "card-show";

        const cardBody = document.createElement("div");
        cardBody.className = "small-card-body";

        // Name
        const title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = registration.name;

        // Email
        const email = document.createElement("p");
        email.className = "card-email";
        email.textContent = `Email: ${registration.email}`;

        // Phone
        const phone = document.createElement("p");
        phone.className = "card-phone";
        phone.textContent = `Phone: ${registration.phone}`;

        // Date
        const date = document.createElement("p");
        date.className = "card-date";
        date.textContent = `Date: ${registration.date}`;

        // Number of tickets
        const tickets = document.createElement("p");
        tickets.className = "card-tickets";
        tickets.textContent = `Tickets: ${registration.Numberofticket}`;

        // Message
        const message = document.createElement("p");
        message.className = "card-message";
        message.textContent = `Message: ${registration.message}`;

        // Append all elements to card body
        cardBody.appendChild(title);
        cardBody.appendChild(email);
        cardBody.appendChild(phone);
        cardBody.appendChild(date);
        cardBody.appendChild(tickets);
        cardBody.appendChild(message);

        // Card actions (edit and delete buttons)
        const cardActions = document.createElement("div");
        cardActions.className = "card-show-actions";

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "refresh-btn";
        editBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

        // Append buttons to card actions
        cardActions.appendChild(editBtn);
        cardActions.appendChild(deleteBtn);

        // Append card body and actions to main card
        card.appendChild(cardBody);
        card.appendChild(cardActions);

        // Append card to the list
        document.getElementById("cardRegistration").appendChild(card);
    });
}






// ===========================================================================================================
// Function to update statistics
function updateStatistics() {

    const tourTransaction = db.transaction(["registration"], "readonly");
    const tourStore = tourTransaction.objectStore("registration");
    const tourRequest = tourStore.count();

    tourRequest.onsuccess = function(event) {
        const rahem = event.target.result;
        console.log(event.target.result);
        
        document.getElementById("totalRegistrations").innerHTML = rahem; // Update total students count
    }
    

}


