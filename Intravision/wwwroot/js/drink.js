const drink = {
    
    template:`
<div >
<p>Выберите сколько хотите внести монет</p>
<div class="counter"  v-for="i in money">
 <button disabled v-if="i.CountMoney<1&&i.Status!=false">{{i.Count}}</button>
 <button v-if="i.CountMoney>=1&&i.Status!=false" @click="addMoney(i.Count)">{{i.Count}}</button>
<button disabled v-if="i.Status==false" @click="addMoney(i.Count)">{{i.Count}}</button>
</div>
<br\>
<br\>
<div class="counter" v-for="i in drinks">
<p>{{i.Name}}</p>
<a @click="buyDrinks(i.Price,i.Id)">
<img style="width:150px;height:150px;" :src="i.PathPhoto">
</a>
<p>{{i.Price}}</p>
<br\>
<br\>
</div>
<br\>
<br\>
</div>


`,
data(){
    return{
        drinks: [],
        money: [],
        modalTitle: "",
        Id: "",
        Name: "",
        PathPhoto: "",
        Price: 0
    }
    },
    
methods:{
    refreshData(){
        axios.get(variables.API_URL +"MachineApi")
        .then((response)=>{
            this.drinks=response.data;
        });
        axios.get(variables.API_URL + "BuyApi")
            .then((response) => {
                this.money = response.data;
            });
    },
    buyDrinks(coin, id) {
        axios.post("http://localhost:7637/Home/BuyDrinks/", null, { params: { price: coin, id: id } })
            .then((response) => {
                this.refreshData();
                alert(response.data);
            });
    },
    addMoney(countMoney) {
        axios.post("http://localhost:7637/Home/AddMoney/",null, { params:{ count: countMoney }})
            .then((response) => {
                this.refreshData();
                alert(response.data);
            });
    },
    addClick(){
        this.modalTitle = "Add Drink";
        this.Id = 0;
        this.Price = 0;
    },
    createClick() {
        axios.post(variables.API_URL + "Buy", {
            Name: this.Name,
            Price: this.Price
        })
            .then((response) => {
                this.refreshData();
                alert(response.data);
            });
    },

},
mounted:function(){
    this.refreshData();
}

}