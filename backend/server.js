import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import natural from "natural";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const api_key = process.env.API_KEY;

// Expanded genres mapping
const genresMap = {
  romance: ["romance", "romantic", "love story", "love", "relationship"],
  comedy: ["comedy", "funny", "humor", "laugh"],
  action: ["action", "superhero", "fight", "battle", "explosion"],
  horror: ["horror", "scary", "frightening", "terrifying"],
  drama: ["drama", "intense", "emotional", "serious"],
  sci_fi: [
    "sci-fi",
    "science fiction",
    "space",
    "robots",
    "futuristic",
    "alien",
  ],
  fantasy: ["fantasy", "magic", "magical", "wizard", "witch"],
  thriller: ["thriller", "suspense", "exciting", "mystery"],
  adventure: ["adventure", "exploration", "journey", "quest"],
  crime: ["crime", "detective", "murder", "police"],
  documentary: ["documentary", "non-fiction", "real-life", "true story"],
  musical: ["musical", "music", "song", "dance"],
  animation: ["animation", "animated", "cartoon"],
  family: ["family", "kids", "children", "family-friendly"],
  history: ["history", "historical", "period", "historical drama"],
  war: ["war", "military", "battlefield", "combat"],
  western: ["western", "cowboy", "outlaw", "frontier"],
  mystery: ["mystery", "whodunit", "puzzle", "detective"],
};

const moodMap = {
  sad: ["sad", "emotional", "tragic"],
  happy: ["happy", "funny", "joyful"],
  exciting: ["exciting", "thrilling"],
};

// NLP Processing Function
function analyzeInput(inputText) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(inputText.toLowerCase());

  console.log("Tokenized words:", words); // Log tokenized words for debugging

  // Extract mood
  let mood = "";
  Object.keys(moodMap).forEach((key) => {
    moodMap[key].forEach((word) => {
      if (words.includes(word)) {
        mood = key;
      }
    });
  });

  // Extract genre
  let genre = "";
  Object.keys(genresMap).forEach((key) => {
    genresMap[key].forEach((phrase) => {
      if (inputText.toLowerCase().includes(phrase)) {
        genre = key;
      }
    });
  });

  return { genre, mood };
}
app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      {
        params: {
          api_key: api_key,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Error fetching popular movies." });
  }
});

app.get("/background", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      {
        params: {
          api_key: api_key,
        },
      }
    );

    res.json(
      response.data.results[Math.floor(Math.random() * 10)].backdrop_path
    );
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Error fetching popular movies." });
  }
});

app.get("/tv", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular`,
      {
        params: {
          api_key: api_key,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching popular TV shows:", error.message);
    res.status(500).json({ error: "Error fetching popular TV shows." });
  }
});
app.get("/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`
    );
    const videoResponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US`
    );
    const imageResponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${api_key}`
    );
    const castResponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}&language=en-US`
    );

    const tvDetails = response.data;
    tvDetails.videos = videoResponse.data.results;
    tvDetails.images = imageResponse.data;
    tvDetails.cast = castResponse.data.cast;
    tvDetails.director = castResponse.data.crew.find(
      (member) => member.job === "Director"
    );
    res.json(tvDetails);
  } catch (error) {
    console.error("Error fetching TV show details:", error.message);
    res.status(500).json({ error: "Error fetching TV show details." });
  }
});
app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    );
    const videoResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
    );
    const imageResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${api_key}`
    );
    const castResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`
    );

    const movieDetails = response.data;
    movieDetails.videos = videoResponse.data.results;
    movieDetails.images = imageResponse.data;
    movieDetails.cast = castResponse.data.cast;
    movieDetails.director = castResponse.data.crew.find(
      (member) => member.job === "Director"
    );
    res.json(movieDetails);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Error fetching movie details." });
  }
});

app.post("/recommend", async (req, res) => {
  const { text } = req.body;
  const analysis = analyzeInput(text);

  console.log("Analysis:", analysis);
  const genreIdMap = {
    romance: 10749,
    comedy: 35,
    action: 28,
    horror: 27,
    drama: 18,
    sci_fi: 878,
    fantasy: 14,
    thriller: 53,
    adventure: 12,
    crime: 80,
    documentary: 99,
    musical: 10402,
    animation: 16,
    family: 10751,
    history: 36,
    war: 10752,
    western: 37,
    mystery: 9648,
  };

  const tmdbGenreId = genreIdMap[analysis.genre];
  if (!tmdbGenreId) {
    return res.status(400).json({ error: "Genre not found in user input." });
  }

  try {
    // Fetch movies based on genre
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: api_key,
          with_genres: tmdbGenreId,
          query: text,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching movie recommendations:", error.message);
    res.status(500).json({ error: "Error fetching movie recommendations." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
