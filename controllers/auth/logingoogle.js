const { OAuth2Client } = require('google-auth-library');
const { User } = require('../../models');
// const bcrypt = require('bcryptjs');
// const { RequestError } = require('../../helpers');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, SECRET_KEY_REFRESH } = process.env;

const GOOGLE_CLIENT_ID =
  '183537649326-lgcq87ah6lomoonfm4ekmbf1b7o3fn3l.apps.googleusercontent.com';

// async function verify(clientid, jwtToken) {
//   const client1 = new OAuth2Client(clientid);
//   // Call the verifyIdToken to
//   // varify and decode it
//   const ticket = await client1.verifyIdToken({
//     idToken: jwtToken,
//     audience: clientid,
//   });
//   // Get the JSON with all the user info
//   const payload = ticket.getPayload();
//   // This is a JSON object that contains
//   // all the user info
//   console.log('payload', payload);
// }
// // return payload;
// verify(
//   '183537649326-lgcq87ah6lomoonfm4ekmbf1b7o3fn3l.apps.googleusercontent.com',
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFkZWRlZWUyZDE4NjliNjU3ZmE5MzAzMDAwODJmZTI2YjNkOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODg2NDQ5MjIsImF1ZCI6IjE4MzUzNzY0OTMyNi1sZ2NxODdhaDZsb21vb25mbTRla21iZjFiN28zZm4zbC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNjkwNDc4MzUwMzgxMDgwMDM3NiIsImVtYWlsIjoib2tzdm92azg1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIxODM1Mzc2NDkzMjYtbGdjcTg3YWg2bG9tb29uZm00ZWttYmYxYjdvM2ZuM2wuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoi0J7QutGB0LDQvdCwINCS0L7QstC6IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGRqZW9IRTZibWgyVXE0SktPSlhBSmFFSVRXZ3ZaSUJlLTNpRndsN2tFPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6ItCe0LrRgdCw0L3QsCIsImZhbWlseV9uYW1lIjoi0JLQvtCy0LoiLCJpYXQiOjE2ODg2NDUyMjIsImV4cCI6MTY4ODY0ODgyMiwianRpIjoiMGY0NmM0NmY5MDViNWM5ZDBlNTc3NTliYThhZjBjODA4MTdmOGI3NyJ9.JynmN40I-8kd4pfpbjgPpiK-2XO15ajNgcgJU9LRqWET0yMsB0MSK8W-pZl6P7I00yLLerYZo56aSO3AS4kGyvQR-6ayYywuooEReUQ5kPTqe0GXogYgZFYI0OtGnEqj7Ji6EoYjjg73Z9hjhK2nC54akajv1bLbj15K0Gp2_UUG61a4-Z8fKae8j4dKXoh1q1yfN4iFU-CJCTIMfQEeOEX4-Pl9FswLfBD7fmoNqnHeel75LJpa48k6eD274Zk46lZ9TSR2m4Ho-3C1cFiw4omjejmoUvp2Mm3rmuzep6kUSU66iBHkTtibVsjT3ZWiNUDku4i87DFzvK4HOtU_3A'
// );

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const logingoogle = async (req, res) => {
  const ticket = await client.verifyIdToken({
    idToken: req.body.credentail,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { email, name } = payload;
  //   const hashPassword = bcrypt.hashSync(sub, bcrypt.genSaltSync(10));

  const user = await User.findOne({ email });

  // if (!user) {
  //   throw RequestError(404, 'No user with this email address was found');
  // }
  if (!user) {
    res.status(404).json({
      email: email,
      name: name,
      message: 'No user with this email address was found',
    });
  }

  const data = {
    id: user._id,
  };

  const token = jwt.sign(data, SECRET_KEY);
  const refreshToken = jwt.sign(data, SECRET_KEY_REFRESH, {
    expiresIn: '30d',
  });

  await User.findByIdAndUpdate(user._id, { token, refreshToken });
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 100,
    httpOnly: true,
  });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      refreshToken,
      user: {
        email,
        name: user.name,
        bloodType: user.bloodType,
        height: user.height,
        age: user.age,
        curWeight: user.curWeight,
        desWeight: user.desWeight,
        dailyCalorie: user.dailyCalorie,
        notRecProducts: user.notRecProducts,
      },
    },
  });
};

module.exports = logingoogle;
