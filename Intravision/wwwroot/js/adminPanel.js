const adminPanel = {

    template: `
<div>
<div id="app">
  Моё имя <input v-model="name">
</div>
<p v-if="name==412" >удачно</p>
<div  v-for="i in money">
<div class="counter" >
<button disabled v-if="i.CountMoney<1&&i.Status!=false">{{i.Count}}</button>
<p>Количество монет: {{i.CountMoney}}</p>
<button v-if="i.CountMoney>=1&&i.Status!=false" @click="addMoney(i.Count)">{{i.Count}}</button>
<button disabled v-if="i.Status==false" @click="addMoney(i.Count)">{{i.Count}}</button>
<button v-if="i.Status==false" @click="DisabledMoney(i.Id,true)">Разморозить</button>
<button v-if="i.Status==true" @click="DisabledMoney(i.Id,false)">Заморозить</button>
<input style="width:250px;" placeholder="Укажите количество монет" :id="'count_'+i.Id"></input>
<button @click="UpdateMoney(i.Id)">Изменить</button>
<br\>
<br\>
</div>
</div>
<table class="table table-striped">
<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
Добавить напиток
</button>
<tbody>
    <tr v-for="i in drinks">
        <td><img style="width:150px;height:150px;" :src="i.PathPhoto"></td>
        <td>{{i.Name}}</td>
        <td>{{i.Price}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(i)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(i.Id)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</thead>
</table>
<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">

        <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <input type="text" class="form-control" v-model="Name">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Price</span>
            <input type="text" class="form-control" v-model="Price">
        </div>
 </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Count</span>
            <input type="text" class="form-control" v-model="Count">
        </div>
<div class="p-2 w-50 bd-highlight">
            <img width="250px" height="250px" :src="PathPhoto"/>
            <input class="m-2" type="file" @change="imageUpload">
        </div>
<p>

</p>

        <button type="button" @click="createClick()"
        v-if="Id==0" class="btn btn-primary">
        Добавить
        </button>
        <button type="button" @click="updateClick()"
        v-if="Id!=0" class="btn btn-primary">
        Редактировать
        </button>

    </div>

</div>
</div>
<br\>
<br\>
</div>


`,
    //< div v-for= "j in photos" >
    //    <div v-if="i.Id === j.AlbumId">
    //        <p>{{ Math.max(j.Id) }}</p>
    //<p>{{photos.filter(j=>j.AlbumId==i.Id)[photos.length-1]}}</p>
    //<p>{{photos.filter(j=>j.AlbumId==i.Id).pop().Url}}</p> - последний элемент
    //<a :Idd="i.Id" :href="'/#/photo/'+i.Id">
    //< img v-bind: src = "photos.filter(j=>j.AlbumId==i.Id).pop().ThumbnailUrl" />

    data() {
        return {
            drinks: [],
            money: [],
            modalTitle: "",
            Id: "",
            Name: "",
            Price: 0,
            PhotoFileName: "",
            PathPhoto: "/photo/anonymous.png",
            Count: 0,
            name:""
        }
    },

    methods: {
        refreshData() {
            axios.get(variables.API_URL + "MachineApi")
                .then((response) => {
                    this.drinks = response.data;
                });
            axios.get(variables.API_URL + "BuyApi")
                .then((response) => {
                    this.money = response.data;
                });
        },
        UpdateMoney(id) {
            axios.post("http://localhost:7637/Home/UpdateMoney/", null, { params: { id: id, count: document.getElementById('count_' + id).value } })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        DisabledMoney(id, status) {
            axios.post("http://localhost:7637/Home/DisableMoney/", null, { params: { id: id, status: status } })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        addClick() {
            this.modalTitle = "Add Drink";
            this.Id = 0;
            this.Name = "";
            this.Count = 0;
            this.Price = 0;
            this.PathPhoto = "/photo/anonymous.png";
        }
        ,
        editClick(dr) {
            this.modalTitle = "Edit Drink";
            this.Id = dr.Id;
            this.Name = dr.Name;
            this.Count = dr.Count;
            this.PathPhoto = dr.PathPhoto;
            this.Price = dr.Price;
        },
        createClick() {

            axios.post(variables.API_URL + "MachineApi", {
                Name: this.Name,
                Photo: this.Photo,
                Count: this.Count,
                Price: this.Price,
                PathPhoto: this.PathPhoto
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios.put(variables.API_URL + "MachineApi", {
                Id: this.Id,
                Name: this.Name,
                Count: this.Count,
                Photo: this.PathPhoto,
                Price: this.Price,
                PathPhoto: this.PathPhoto
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm("Вы уверены?")) {
                return;
            }
            axios.delete(variables.API_URL + "MachineApi/" + id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });

        },
        imageUpload(event) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            axios.post(
                variables.API_URL + "MachineApi/savefile",
                formData)
                .then((response) => {
                    this.PathPhoto = "/photo/" + response.data;
                });
        }

    },
    mounted: function () {
        this.refreshData();
        this.name = localStorage.name;
    },
    watch: {
        name(newName) {
            localStorage.name = newName;
        }
    }
}
    