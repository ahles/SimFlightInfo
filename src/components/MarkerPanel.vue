<template>
  <div
    class="marker-panel"
  >
    <h2 class="marker-panel__title">
      {{ $t('Set Marker') }}
    </h2>
    <div
      v-if="isEdit"
      class="marker-panel__edit"
    >
      <p>
        <v-text-field
          ref="latitude"
          v-model="localMarker.latitude"
          :label="$t('Latitude')"
          filled
          dense
          dark
          suffix="°"
          required
          :rules="[rules.required, rules.latitude]"
        />
      </p>
      <p>
        <v-text-field
          ref="longitude"
          v-model="localMarker.longitude"
          :label="$t('Longitude')"
          filled
          dense
          dark
          suffix="°"
          required
          :rules="[rules.required, rules.longitude]"
        />
      </p>
      <p
        class="marker-panel__buttons"
      >
        <v-btn
          small
          dark
          @click="setMarker"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>

        <v-btn
          small
          dark
          @click="clearMarker"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </p>
    </div>
    <div
      v-else
      class="marker-panel__view"
    >
      <table class="marker-panel__table">
        <tbody>
          <tr>
            <td>
              {{ $t('Latitude') }}
            </td>
            <td>
              {{ localMarker.latitude }}°
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('Longitude') }}
            </td>
            <td>
              {{ localMarker.longitude }}°
            </td>
          </tr>
        </tbody>
      </table>
      <v-btn
        small
        dark
        class="marker-panel__edit-button"
        @click="isEdit = true"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MarkerPanel',
  data: () => ({
    isEdit: false,
    formInValid: true,
    // https://codepen.io/pen/?editors=1010
    rules: {
      required: null,
      latitude: null,
      longitude: null,
    },
    localMarker: {
      latitude: null,
      longitude: null,
    },
  }),
  created() {
    this.initRules();
  },
  mounted() {
    this.localMarker = this.$store.getters.getMarker();
  },
  updated() {
    this.localMarker = this.$store.getters.getMarker();
  },
  methods: {
    setMarker() {
      this.validateForm();
      if (!this.formInValid) {
        this.$store.commit('SET_CUSTOM_MARKER_LATITUDE', Number(this.localMarker.latitude));
        this.$store.commit('SET_CUSTOM_MARKER_LONGITUDE', Number(this.localMarker.longitude));
        this.isEdit = false;
      }
    },
    clearMarker() {
      this.$store.commit('SET_CUSTOM_MARKER_LATITUDE', null);
      this.$store.commit('SET_CUSTOM_MARKER_LONGITUDE', null);
    },
    initRules() {
      this.rules.required = (value) => !!value || 'Required.';
      this.rules.latitude = (value) => {
        const valid = !!((Number(value) >= -90 && Number(value) <= 90));
        return valid || 'invalid latitude';
      };
      this.rules.longitude = (value) => {
        const valid = !!((Number(value) >= -180 && Number(value) <= 180));
        return valid || 'invalid longitude';
      };
    },
    validateForm() {
      this.formInValid = false;

      Object.keys(this.localMarker).forEach((formElement) => {
        const validation = this.$refs[formElement].validate(true);
        if (validation === false) {
          this.formInValid = true;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.marker-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  min-width: 200px;
  z-index: 2;
  background-color: #363636;
  color: white;
  padding: 1rem;
  line-height: 1;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: 400;
  }

  &__edit {

    p:last-of-type {
      margin-bottom: 0;
    }

    // .v-messages,
    // .v-text-field__details {
    //   display: none !important;
    // }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }

  &__table {
    width: 100%;
    margin: 10px 0;

    td {
      font-weight: 300;

      &:last-of-type {
        text-align: right;
      }
    }
  }

}
</style>
