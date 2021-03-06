Vue.component('app-bar', {
  template: `
    <nav class="navbar navbar-inverse">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Eth Places Registrator</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><a href="#yop">Yop</a></li>
        </ul>
      </div>
    </div>
  </nav>`
});

Vue.component('app-body', {
  template: `<div class="container theme-showcase" role="main">

    <div class="starter-template">
      <h1>Aggregator d'appart</h1>
      <p class="lead">Let's go!</p>
    </div>

    <annonce v-for="item in apparts" v-bind:annonce="item"></annonce>
  </div>`,

  mounted: function () {
      this.fetchAnnonces();
  },

  data: function() {
    return {
      apparts: []
    }
  },

  methods: {
    fetchAnnonces: function() {
      console.log("fetching apparts");
      this.$http.get('api/apparts').then(
        response => {
          if (response.status == 200)
          {
            this.apparts = response.body;
          }
          else
          {
            console.error(JSON.stringify(response));
            this.apparts = [];
          }
        }, response => {
            console.error(JSON.stringify(response));
            this.apparts = [];
        });
    }
  }
});

Vue.component('annonce', {
  props: ['annonce'],
  template: `
<div class="panel panel-primary">
    <div class="panel-heading">
        <h3 class="panel-title">
          <a v-bind:href="annonce.url" target="_blank" style="color: white;">{{annonce.departement}} - {{annonce.price}}€ - {{annonce.surfaceArea}}m² - {{annonce.origin}}</a>
          <button style="float:right;" v-on:click="excludeId(annonce.id)">X</button></h3>
    </div>
    <div class="panel-body" v-bind:style="{ display: isExcluded ? 'none' : 'block' }">
        <div class="col-xs-6">
          <p>{{annonce.description}}</p>
        </div>
        <div class="col-xs-6" style="overflow-x: scroll; overflow-y: hidden; height: 220px;">
          <div style="width: max-content;">
            <img v-for="photo in annonce.photos" v-bind:src="photo" style="margin-left: 10px;margin-right: 10px;height: 200px;float:left;"></img>
          </div>
        </div>
    </div>
</div>`,
  data: function() {
    return {
      isExcluded: false
    }
  },

  methods: {
    excludeId: function(id) {
      this.isExcluded = !this.isExcluded;
      this.$http.post(`/api/apparts/filter-id/${id}`, { value: this.isExcluded });    
    }
  }
});

new Vue({
  el: '#app',
  mounted: function() {
  },
  data: {
  }
});
