//https://www.wordsapi.com/
// includes jquery


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const colorsData = [
  {name:"Red", value:"red", hex: "#e20613"},
  {name:"Green", value:"green", hex: "#33aa52"},
  {name:"Blue", value:"blue", hex: "#4980c0"},
  {name:"Yellow", value:"yellow", hex: "#ffe500"},
  {name:"Gold", value:"gold", hex: "#ffe500"},
  {name:"White", value:"white", hex: "#ffffff"},
  {name:"Black", value:"black", hex: "#1d1d1b"},
  {name:"Grey", value:"grey", hex: "#7c7b7a"},
  {name:"Pink", value:"pink", hex: "#ed7aa2"},
  {name:"Purple", value:"purple", hex: "#a777b1"},
  {name:"Indigo", value:"indigo", hex: "#4b0082"},
  {name:"Orange", value:"orange", hex: "#f29101"},
  {name:"Brown", value:"brown", hex: "#a9713d"},
];


const labeledCultures = [
  {name:"Western American", value: "westernAmerican"},
  {name:"Western European", value: "westernEuropean"},
  {name:"South American", value: "southAmerican"},
  {name:"Russian", value: "russia"},
  {name:"Indian", value: "india"},
  {name:"North African", value: "northAfrica"},
  {name:"South African", value: "southAfrica"},
  {name:"Muslim", value: "muslim"},
  {name:"Asian", value: "asia"},
  {name:"Chinese", value: "chinese"},
  {name:"Japanese", value: "japanese"},
  {name:"Native American", value: "nativeAmericans"}
];

var fails = [
  {name: "earthy", definition: "TO DEFINE"},
  {name: "west", definition: "A cardinal direction."},
  {name: "mourning", definition: "State of sorrow over the death or departure of a loved one."},
  {name: "love", definition: "A feeling of warm personal attachment or deep affection, as for a parent, child, or friend."},
  {name: "respect", definition: "An attitude of admiration or esteem."},
  {name: "overcoming challenges", definition: null},
  {name: "profound urges", definition: null},
  {name: "universal oneness", definition: null},
  {name: "jealousy / envy", definition: "Vigilance in maintaining or guarding something."},
  {name: "living willfully", definition: "To not be a slave."},
  {name: "bride", definition: "A newly married woman or a woman about to be married."},
  {name: "objective / rational", definition: "Not influenced by personal feelings or opinions in considering and representing facts."},
  {name: "defeat / trouble", definition: "Be unsuccessful in achieving one's goal."},
  {name: "spiciness", definition: "The property of being seasoned with spice and so highly flavored."},
  {name: "the outdoors", definition: null},
  {name: "evil influences", definition: null},
  {name: "repels evil", definition: null},
  {name: "young boys", definition: null},
  {name: "death and rebirth", definition: null},
  {name: "against evil", definition: "To fight evil."},
  {name: "child-like personality", definition: "Act like a child while being an adult"},
  {name: "helpful people", definition: "Giving or ready to give help."},
  {name: "honouring", definition: "Regard with great respect."},
  {name: "the heavens", definition: "A place regarded in various religions as the abode of God (or the gods) and the angels, and of the good after death, often traditionally depicted as being above the sky."},
];

var colors = [
      {
          "hex": "#e20613",
          "name": "red",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["hot", "love", "passion", "power", "eroticism", "radical (political)", "excitement", "boldness", "devil", "danger", "desire", "anger", "spiciness"],
            "westernEuropean": ["danger"],
            "southAmerican": ["success", "triumph"],
            "russia": ["revolution", "beauty", "luck"],
            "india": ["heat", "passion", "sensuality", "energy", "bride"],
            "northAfrica": ["good luck"],
            "southAfrica": ["mourning"],
            "muslim": ["fire"],
            "asia": ["marriage", "happiness", "prosperity"],
            "chinese": ["wedding", "fertility", "happiness", "success", "fortune", "good luck"],
            "japanese": ["love", "passion", "excitement", "strength", "danger", "profound urges", "aggression", "celebration"],
            "nativeAmericans": ["warmth", "passion", "heart", "emotions", "success"],
          }
      },
      {
          "hex": "#f29101",
          "name": "orange",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["friendly", "reliable", "warmth"],
            "westernEuropean": [""],
            "southAmerican": [""],
            "russia": [""],
            "india": ["auspicious", "desire", "energising", "holy", "fertility"],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": [""],
            "asia": [""],
            "chinese": ["learning", "kinship"],
            "japanese": ["enthusiasm", "balance", "warmth", "energy", "flamboyance"],
            "nativeAmericans": ["learning", "healing"],
          }
      },
      {
          "hex": "#ffe500",
          "name": "yellow",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["fun", "energetic", "jubilant", "peace", "overpowering", "cowardly", "quarantine", "jaundice"],
            "westernEuropean": [""],
            "southAmerican": ["mourning"],
            "russia": [""],
            "india": ["divinity", "laughter", "energising", "joy", "attracts", "love", "willpower", "repels evil", "sensuality"],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": ["strength", "mourning"],
            "asia": ["sacred", "against evil", "imperial"],
            "chinese": ["royalty", "nourishing", "respect"],
            "japanese": ["joy", "deceit", "courage", "cowardice", "hazard", "illness", "idealism"],
            "nativeAmericans": ["illumination", "love", "overcoming challenges", "trouble", "inspiration"],
          }
      },
      {
          "hex": "#33aa52",
          "name": "green",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["earthy", "grow", "natural", "environmental", "trust", "jealousy", "calm", "luck", "money"],
            "westernEuropean": [""],
            "southAmerican": ["death"],
            "russia": [""],
            "india": ["fertility", "vitality", "life", "islam", "love", "compassion", "soothes", "universal oneness", "happiness", "tradition"],
            "northAfrica": ["islam"],
            "southAfrica": [""],
            "muslim": ["islam", "heaven", "paradise", "god"],
            "asia": ["harmony", "peace", "eternity", "prosperity", "family"],
            "chinese": ["growth", "life", "infidelity", "exorcism", "sunrise", "vigour"],
            "japanese": ["nature", "environment", "jealousy / envy", "eternal life", "misfortune", "good luck", "youth", "living willfully"],
            "nativeAmericans": [""],
          }
      },
      {
          "hex": "#4980c0",
          "name": "blue",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["quiet", "serious", "passivity", "corporate", "liberal", "cold", "smart", "progress", "music", "trust", "freedom", "royal", "medicine", "loyalty", "depression", "peaceful", "objective / rational"],
            "westernEuropean": [""],
            "southAmerican": ["defeat / trouble"],
            "russia": [""],
            "india": ["creativity", "communication", "calm", "gods", "sacred"],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": ["heaven", "spirituality", "immortality", "mourning", "merciful"],
            "asia": ["wealth", "self-cultivation"],
            "chinese": [""],
            "japanese": ["stability", "purity", "cold", "wealth", "loyalty", "depression", "peace", "technology", "femininity", "life"],
            "nativeAmericans": ["trouble", "north", "cold", "intuition", "defeat"],
          }
      },
      {
          "hex": "#a777b1",
          "name": "purple",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["ambivalence", "extravagant", "mystery", "modesty", "virtue", "power", "sexiness", "sophistication", "artificial", "eclectic", "sensual", "vanity", "royal", "decadent", "romantic", "elegant"],
            "westernEuropean": [""],
            "southAmerican": ["mourning"],
            "russia": [""],
            "india": ["air", "intuition", "understanding"],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": [""],
            "asia": ["mourning", "expensive"],
            "chinese": [""],
            "japanese": ["ceremony", "spirituality", "enlightenment", "mourning", "nobility", "wisdom", "royalty", "cruelty", "arrogance", "mysterious"],
            "nativeAmericans": ["healing", "gratitude", "wisdom"],
          }
      },
      {
          "hex": "#4b0082",
          "name": "indigo",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": [""],
            "westernEuropean": [""],
            "southAmerican": [""],
            "russia": [""],
            "india": ["seeing", "knowing"],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": [""],
            "asia": [""],
            "chinese": [""],
            "japanese": [""],
            "nativeAmericans": [""],
          }
      },
      {
          "hex": "#a9713d",
          "name": "brown",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["uncultivated", "laziness", "security", "spoiled", "reliable", "solid", "romantic", "warm", "earthy", "rustic"],
            "westernEuropean": [""],
            "southAmerican": [""],
            "russia": [""],
            "india": [""],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": [""],
            "asia": [""],
            "chinese": [""],
            "japanese": ["the outdoors", "simplicity", "endurance", "home", "earth", "comfort"],
            "nativeAmericans": ["self-discipline", "knowing", "good"],
          }
      },
      {
          "hex": "#1d1d1b",
          "name": "black",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["mourning", "death", "overpowering", "aloof", "evil", "submission", "eternity", "style", "power", "authority"],
            "westernEuropean": ["mourning"],
            "southAmerican": [""],
            "russia": [""],
            "india": ["anger", "darkness", "negativity", "inertia", "evil", "penance"],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": ["mourning", "clergy", "devotion (Shi'ite women)"],
            "asia": ["career", "knowledge", "self-cultivation", "mourning", "evil influences", "penance"],
            "chinese": ["young boys", "reliability", "trust"],
            "japanese": ["age", "fear", "mystery", "wealth", "bad luck", "experience", "depth", "mourning", "unhappiness", "evil", "solemnity", "style", "class", "nobility"],
            "nativeAmericans": ["harmony", "reflection", "self-examination", "death", "west", "problems"],
          }
      },
      {
          "hex": "#ffffff",
          "name": "white",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["perishability", "clarity", "tranquility", "luxury", "vagueness", "emptiness", "bride", "sterility", "neutral", "purity", "summer", "truce"],
            "westernEuropean": [""],
            "southAmerican": [""],
            "russia": ["truce"],
            "india": ["death and rebirth", "brightness", "peace", "tranquility", "truce"],
            "northAfrica": [""],
            "southAfrica": ["truce"],
            "muslim": ["prayer", "death", "peace", "purity", "truce"],
            "asia": ["mourning", "travel", "children", "peace", "purity", "marriage"],
            "chinese": ["mourning", "death", "truce"],
            "japanese": ["humility", "mourning", "death", "youth", "sacred", "reverence", "cleanliness", "purity", "truce"],
            "nativeAmericans": ["sharing", "magnetism", "happiness", "peace", "warmth"],
          }
      },
      {
          "hex": "#ed7aa2",
          "name": "pink",
          rgb: {r:0,g:0,b:0},
          "cultures": {
          "westernAmerican": ["girl", "feminine", "cute", "tranquillising"],
          "westernEuropean": [""],
          "southAmerican": [""],
          "russia": [""],
          "india": [""],
          "northAfrica": [""],
          "southAfrica": [""],
          "muslim": [""],
          "asia": ["marriage"],
          "chinese": [""],
          "japanese": ["flirtatious", "purity", "sexuality", "life", "good health", "girlish", "feminine", "child-like personality"],
          "nativeAmericans": ["motivation", "seeing", "working", "creativity"],
        }
      },
      {
          "hex": "#7c7b7a",
          "name": "grey",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["pollution", "decay", "boredom", "respect", "elegance", "humility"],
            "westernEuropean": [""],
            "southAmerican": [""],
            "russia": [""],
            "india": [""],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": [""],
            "asia": ["travel", "helpful people"],
            "chinese": [""],
            "japanese": ["staid", "intelligence", "reliability", "old age", "conservative", "modesty"],
            "nativeAmericans": ["honouring", "friendship"],
          }
      },
      {
          "hex": "#ffe500",
          "name": "gold",
          rgb: {r:0,g:0,b:0},
          "cultures": {
            "westernAmerican": ["wealth", "money"],
            "westernEuropean": [""],
            "southAmerican": [""],
            "russia": [""],
            "india": [""],
            "northAfrica": [""],
            "southAfrica": [""],
            "muslim": [""],
            "asia": ["strength", "wealth"],
            "chinese": ["happiness", "wealth"],
            "japanese": ["the heavens", "religion", "royalty"],
            "nativeAmericans": [""],
          }
      }
  ];


$(document).ready(function() {

var response = [];

var isKeywordAlreadyThere = function(keyword) {
  for(var i=0;response.length > i;i++) {
    if(keyword == response[i].name) {
      return true;
    }
  }
  return false;
}

var getDefinition = function(tag) {

    var suffix = "?X-Mashape-Key=tqCMYK8LINmshg7R7SJ4eYalXci7p1u9pYrjsn08RceLvY7grP&X-Mashape-Host=wordsapiv1.p.mashape.com";
    if (tag.name.indexOf("(") != -1) {
      tag.name = tag.name.split('(')[0];
      tag.name = tag.name.trim();
    }
    $.ajax({
      type:"GET",
      url:"https://wordsapiv1.p.mashape.com/words/" + tag.name + "/definitions",
      async: true,
      crossDomain: true,
      headers: {
        "X-Mashape-Key": "tqCMYK8LINmshg7R7SJ4eYalXci7p1u9pYrjsn08RceLvY7grP",
        "X-Mashape-Host": "wordsapiv1.p.mashape.com"
      },
      success: function(data) {
        if(data && data.definitions && data.definitions[0] && data.definitions[0].definition)
          tag.definition = data.definitions[0].definition;
        else
          tag.definition = null;
      },
      error: function() {
        tag.definition = null;
      }
    });
  }

  colors.map(function(color) {

    for (var culture in color.cultures) {
      color.cultures[culture].map(function(keyword) {
        if (keyword) {

          if(isKeywordAlreadyThere(keyword)) {
            response.map(function(tag) {
              if(tag.name == keyword) {
                tag.data.push({color: color.name, hex: color.hex, culture: culture + ""});
              }
            });
          }
          else {
              response.push({name: keyword, value: keyword, data: [{color: color.name, hex: color.hex, culture: culture + ""}]});
          }
        }

      });

    }
  });

  // console.log(response);

  response.map(function(tag) {
    tag.dataLength = tag.data.length;
  });

  response.sort(function(a, b) {
      return b.dataLength - a.dataLength
  })

  var replaceLabel = function(culture) {
    labeledCultures.map(function(labeledCulture) {
      if(labeledCulture.value == culture.culture) {
        culture.label = labeledCulture.name;
      }
    })
  }

  response.map(function(tag) {
    tag.label = tag.name.capitalize();
    tag.data.map(function(culture) {
      replaceLabel(culture);
    });

  });

  response.map(function(tag) {
    // getDefinition(tag);
    tag.definition = null;
  });

  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0].percent;
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i].percent > max) {
            maxIndex = i;
            max = arr[i].percent;
        }
    }

    return maxIndex;
}


  // pie datas

  response.map(function(tag) {

    tag.pie = {
      dominant: [],
      data: []
    };

    colorsData.map(function(color) {
      color.counter = 0;
    });

    tag.data.map(function(match) {
      colorsData.map(function(color) {
          if (color.value == match.color) {
            color.counter++;
          }
      });
    });

    var totalColor = 0;

    colorsData.map(function(color) {
      totalColor += color.counter;
    });

    colorsData.map(function(color) {
      var rounded = Math.round(color.counter / totalColor * 100) / 100;
      tag.pie.data.push({count: color.counter, name:color.color, percent: rounded, hex: color.hex});
    });


    tag.pie.data.map(function(color, index) {
      if(colorsData[index]) {
        color.name = colorsData[index].name;
        color.hex = colorsData[index].hex;
      }
    });


    var suposedMaxValue = tag.pie.data[indexOfMax(tag.pie.data)].count;

    tag.pie.data.map(function(obj, index) {
      if(suposedMaxValue == obj.count) {
        tag.pie.dominant.push(colorsData[index].value);
      }
    });

    // tag.pie.dominant = colorsData[indexOfMax(tag.pie.data)].name;

    console.log(tag.pie.dominant.length);
  });

  // end of pie datas

  // sort tags.data by dominant

  response.map(function(tag) {

    tag.data.map(function(match) {
      console.log(match.counter);
    });

  });


  window.setTimeout(function(){
    response.map(function(tag) {
        fails.map(function(fail) {
          if(tag.name == fail.name)
            tag.definition = fail.definition;
        });
    });
    $("#coucou").html(JSON.stringify(response, null, 2));
  }, 30000);

});
