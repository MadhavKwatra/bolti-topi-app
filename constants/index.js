export const LANGUAGE = {
  english: {
    title: "Welcome to the Sorting Hat App!",
    message: "Let the sorting begin! Which house awaits you?",
    housesDetails: {
      gryffindor: {
        image: require("../assets/houses/gryffindor-crest.png"),
        title: "Gryffindor",
        description: "The brave and daring.",
      },
      ravenclaw: {
        image: require("../assets/houses/ravenclaw-crest.png"),
        title: "Ravenclaw",
        description: "The wise and witty.",
      },
      hufflepuff: {
        image: require("../assets/houses/hufflepuff-crest.png"),
        title: "Hufflepuff",
        description: "The loyal and hardworking.",
      },
      slytherin: {
        image: require("../assets/houses/slytherin-crest.png"),
        title: "Slytherin",
        description: "The cunning and ambitious.",
      },
    },
  },
  hinglish: {
    title: "Welcome to the Bolti Topi App!",
    message: "Let the sorting begin! Which house awaits you?",
    housesDetails: {
      gryffindor: {
        image: require("../assets/houses/gryffindor-crest.png"),
        title: "Garud Dwaar",
        description: "The brave and daring.",
      },
      ravenclaw: {
        image: require("../assets/houses/ravenclaw-crest.png"),
        title: "Cheel Ghaat",
        description: "The wise and witty.",
      },
      hufflepuff: {
        image: require("../assets/houses/hufflepuff-crest.png"),
        title: "Mehnat Kaksha",
        description: "The loyal and hardworking.",
      },
      slytherin: {
        image: require("../assets/houses/slytherin-crest.png"),
        title: "Naag Shakti",
        description: "The cunning and ambitious.",
      },
    },
  },
};

export const getHouseMessages = (language, house) => {
  switch (house) {
    case "gryffindor":
      return `Ah, so you've been sorted into ${
        language === "hinglish" ? "Garud-dwaar" : "Gryffindor"
      }! Your bravery shines bright, my dear student. Wear your house colors with pride, for you belong among the courageous and daring. Let your lion-hearted spirit guide you through your Hogwarts journey!`;
    case "ravenclaw":
      return `Welcome to ${
        language === "hinglish" ? "Cheel Ghaat" : "Ravenclaw"
      }! Your intellect and wit are truly remarkable. In this house of learning, may you find endless opportunities to expand your knowledge and unravel the mysteries of the world. Embrace your eagle's vision and soar to great heights!`;
    case "hufflepuff":
      return `Congratulations on being sorted into ${
        language === "hinglish" ? "Mehnat Kaksha" : "Hufflepuff"
      }! Your loyalty and hard work will be cherished here. Within these walls, you'll find a family bound by friendship and dedication. Let the warmth of your badger heart illuminate the path ahead!`;
    case "slytherin":
      return `Ah, ${
        language === "hinglish" ? "Naag Shakti" : "Slytherin"
      } it is! Your cunning and ambition are truly remarkable qualities. In this house of snakes, you'll find the drive to achieve greatness and the courage to pursue your goals. Embrace your inner serpent and conquer the challenges that lie ahead!`;
    default:
      return "Are you trying to change your destiny";
  }
};
