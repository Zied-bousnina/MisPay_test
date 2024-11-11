function server() {
    return "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";
  }

  export const ApiConfigs = {
    base_url: server(),
    /* -------------------------------- */

    apis: {
        Nasa: {
            getAsteroids: "",

        },



    },
  };
