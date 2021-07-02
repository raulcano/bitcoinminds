<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">About</h6>
                <p class="text-muted about-text">
                  This is a website for anyone interested in Bitcoin. By presenting a curated a list of relevant "food for thought", I hope that this will be useful for anyone going down the rabbit hole.
                </p>
                
                
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link"
                           href="https://twitter.com/raul__cano"
                           target="_blank">
                            <i class="ni ni-spaceship"></i> @raul__cano
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="https://github.com/raulcano/bitcoin-resources"
                           target="_blank">
                            <i class="ni ni-like-2"></i> GitHub
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="http://www.theknowledgeargument.com/"
                           title="The Knowledge Argument"
                           target="_blank">
                            <i class="ni ni-bulb-61"></i> Blog
                        </a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link"
                           href="#"
                           >
                            <i class="ni ni-satisfied"></i> Buy me a beer?
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'
  import { library } from '@fortawesome/fontawesome-svg-core'
  
  // import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
  // library.add(faFontAwesome)
  
  import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
  library.add(faUserSecret)
  

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/bitcoin-logo.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
<style scoped>
.about-text{
  font-size: 13px;
}
</style>