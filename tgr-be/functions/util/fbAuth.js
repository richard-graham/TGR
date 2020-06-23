const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1]; // splits the auth header into an arr, 1st val = 'Bearer ' 2nd val = token
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized, please login" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(req.user.uid);
      return db
        .collection("users") // handle is not stored in fbauth so need to add manually
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0] // even though we only request one object it's still returned in docs which is an arr
        .data().handle; // extracts the data from the function
      (req.user.imageUrl = data.docs[0].data().imageUrl),
        (req.user.avatarLetters = data.docs[0].data().avatarLetters);
      req.user.stripe = data.docs[0].data().stripe;
      return next(); // allows the request to proceed
    })
    .catch((err) => {
      console.error("Error while verifying token", err);
      return res.status(403).json(err);
    });
};
