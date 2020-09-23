<template>
  <div
    class="marker-panel"
  >
    <h2 class="marker-panel__title">
      {{ $t('Set Marker') }}
    </h2>
    <div
      v-if="!isSet"
      class="marker-panel__edit"
    >
      <p>
        <v-text-field
          v-model="latitude"
          :label="$t('Latitude')"
          filled
          dense
          dark
          suffix="°"
          :rules="[rules.required, rules.latitude]"
        />
      </p>
      <p>
        <v-text-field
          v-model="longitude"
          :label="$t('Longitude')"
          filled
          dense
          dark
          suffix="°"
          :rules="[rules.required, rules.longitude]"
        />
      </p>
      <p>
        <v-text-field
          v-model="name"
          :label="$t('Name')"
          filled
          dense
          dark
        />
      </p>
      <p>
        <v-btn
          small
          dark
          @click="setMarker"
        >
          {{ $t('set') }}
        </v-btn>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MarkerPanel',
  data: () => ({
    isSet: false,
    latitude: null,
    longitude: null,
    name: '',
    // https://codepen.io/pen/?editors=1010
    rules: {
      required: (value) => !!value || 'Required.',
      latitude: (value) => {
        const valid = !!((Number(value) >= -90 && Number(value <= 90)));
        return valid || 'invalid latitude';
      },
      longitude: (value) => {
        const valid = !!((Number(value) >= -180 && Number(value <= 180)));
        return valid || 'invalid longitude';
      },
    },
  }),
  methods: {
    setMarker() {
      console.log('setMarker');
    },
  },
};
</script>

<style lang="scss">
.marker-panel {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 200px;
  transform: translateX(-50%);
  z-index: 5;
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

}
</style>
