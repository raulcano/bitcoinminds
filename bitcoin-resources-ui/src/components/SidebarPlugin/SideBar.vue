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
                  'Bitcoin Minds' is the most comprehensive list of Bitcoin resources online.
                  If you are going down the Bitcoin rabbit hole, you'll probably want to keep close this tool. 
                  For feedback or anything, feel free to contact me:
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
                           v-b-modal.my-modal
                           >
                            <i class="ni ni-satisfied"></i> Buy me a beer?
                        </a>
                    </li>
                </ul>
            </div>
            </div>
          <b-modal id="my-modal" class="text-center">

            <template #modal-header="{}">
              <div class="text-sm text-center">
              There is quite some effort and a bit of money invested in keeping the website up and running.
              If you are happy with the results and want to make a donation, I'll appreciate it enormously!
              </div>
            </template>

            <template #default="{  }">
              <div class="text-center">
              <img class="mb-2" 
                :src="toggleQRcode ? '/img/donationsQR.png' : '/img/donationsQR_2.png'" 
                alt="bc1q57ssg4awnav5gtlg6z4vhpfek4dlghan950h3y" width="300px">
              <br>
              bc1q57ssg4awnav5gtlg6z4vhpfek4dlghan950h3y
              </div>
            </template>

            <template #modal-footer="{ }">
              <b-button size="sm" variant="success" v-b-popover="'Well, then send your sats to the Bitcoin address, thanks!'"
              @click="toggleQRcode = !toggleQRcode">
                Shut up and take my money
              </b-button>
              <b-button size="sm" variant="secondary" v-b-popover="'I know...Just need some time :( Alternatively, you could send at TX with very low fees, I\'m not in a hurry :D :D'">
                Maybe when you enable Lightning for donations
              </b-button>
            </template>






          </b-modal>
    </nav>
    
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    data() {
      return {
        toggleQRcode: true
      }
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
      },
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