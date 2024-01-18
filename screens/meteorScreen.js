import react, { Component } from "react";
import { View, Text } from "react-native";
import axios from "axios";

export default class MeteorScreen extends Component {
  constructor() {
    super();
    this.state = {
      meteors: {},
    };
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=aHJTmR3fTE3zAKiO5vBOV4fk8w0SL7gkufrkpRWN"
      )
      .then((dados) => {
        this.setState({
          meteors: dados.data.near_earth_objects,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Text style={{ fontSize: 50, color: "white" }}>Carregando ...</Text>
        </View>
      );
    } else {
      let meteor_list = Object.keys(this.state.meteors).map((data) => {
        return this.state.meteors[data];
      });
      let meteors = [].concat.apply([], meteor_list);

      meteors.forEach((element) => {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threat_score = threatScore;
        console.log(threatScore);
      });

      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Text style={{ fontSize: 50, color: "white" }}>
            Tela de meteoros!
          </Text>
        </View>
      );
    }
  }
}

//https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=aHJTmR3fTE3zAKiO5vBOV4fk8w0SL7gkufrkpRWN
