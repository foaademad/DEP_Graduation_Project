

    let db;
    let rahemclient = [] 



const dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("IDBDatabase", 1);

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
        const doctorStore = db.createObjectStore("client", {
        keyPath: "id",
        autoIncrement: true,
        });
        doctorStore.createIndex("email", "email", {
        unique: false,
        });


    }

})




 function addClient() {
    
    const clientEmail = document.getElementById("clientEmail").value;
    const clientPass = document.getElementById("clientpass").value;
    const clientConfirmPass = document.getElementById("clientconfirmpass").value;
    // const clientMessage = document.getElementById("clientMessage").value;

    if (!clientEmail || !clientPass || !clientConfirmPass ) {
        alert("Please fill out all fields.");
        return;
    }
    // confirm the password and confirm password equal 
    if (clientPass!== clientConfirmPass) {
        alert("you should write the same password");
        return;
    }
    
    dbPromise.then((db) => {
        const transaction = db.transaction("client", "readwrite");
        const clientStore = transaction.objectStore("client");

        const newClient = { 
            email: clientEmail, 
            pass: clientPass,
            confirmPass: clientConfirmPass 
        };

        const addRequest = clientStore.add(newClient); // استخدم add لإضافة بيانات جديدة دائماً

        addRequest.onsuccess = function () {
            console.log("تمت إضافة العميل بنجاح:", newClient);
        };

        addRequest.onerror = function (event) {
            console.error("خطأ في إضافة العميل:", event.target.error);
        };
    });
    // emputy the input 
    document.getElementById("clientEmail").value = "";
    document.getElementById("clientpass").value = "";
    document.getElementById("clientconfirmpass").value = "";

  
}

// Function to display the list of client
function fetchDoctorsDentistry() {
    dbPromise.then((db) => {
        const transaction = db.transaction('client', 'readonly');
        const doctorObjectStore = transaction.objectStore('client');

        const dentistDoctors = doctorObjectStore.getAll();

        dentistDoctors.onsuccess = function (event) {
            console.log(event.target.result)

        let dataClient = event.target.result

        rahemclient = dataClient
            document.getElementById("totalClients").textContent = dataClient.length
            displayClients(event.target.result)
        };

        dentistDoctors.onerror = function (event) {
            console.error("حدث خطأ في جلب دكاترة الأسنان:", event.target.error);
        };
    }).catch((error) => {
        console.error("خطأ في فتح قاعدة البيانات:", error);
    });
}
fetchDoctorsDentistry();




function displayClients(clients) {

        clients.map(client => {
            const card = document.createElement("div");
            card.className = "card-show";

            const cardBody = document.createElement("div");
            cardBody.className = "small-card-body";

            const email = document.createElement("p");
            email.className = "card-email";
            email.textContent = `Email: ${client.email}`;

            const pass = document.createElement("p");
            pass.className = "card-password";
            pass.textContent = `password: ${client.pass}`;

            const confirmPass = document.createElement("p");
            confirmPass.className = "card-password";
            confirmPass.textContent = `Confirm Password: ${client.confirmPass}`;


            cardBody.appendChild(email);
            cardBody.appendChild(pass);
            cardBody.appendChild(confirmPass);

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
            // delet the client 
            deleteBtn.onclick = function() {
                deleteClient(client.id); // ا��تخدم الدالة المنا��بة لحذف العميل
                fetchDoctorsDentistry(); // تحديث القا��مة المعلومات
            }

            // إضافة الأزرار إلى cardActions
            cardActions.appendChild(editBtn);
            cardActions.appendChild(deleteBtn);

            // إضافة محتويات البطاقة والأزرار إلى البطاقة الرئيسية
            card.appendChild(cardBody);
            card.appendChild(cardActions);

            // إضافة البطاقة إلى القائمة
            clientList.appendChild(card);
        });
    
}

function updateStatistics() {
    
  
        const clientTransaction = db.transaction(["client"], "readonly");
        const clientStore = clientTransaction.objectStore("client");
        const clientRequest = clientStore.count();
    
        clientRequest.onsuccess = function(event) {
            document.getElementById("totalClients").textContent = event.target.result; // Update total courses count
        };
}


// function delete client

function deleteClient(clientId) {
    dbPromise.then((db) => {
        const transaction = db.transaction("client", "readwrite");
        const clientStore = transaction.objectStore("client");

        const deleteRequest = clientStore.delete(clientId);

        deleteRequest.onsuccess = function () {
            console.log("تم حذف العميل بنجا��");
            fetchDoctorsDentistry(); // تحديث القا��مة بعد الحذف
        };

        deleteRequest.onerror = function (event) {
            console.error("خطأ في حذف العميل:", event.target.error);
        };
    });
}