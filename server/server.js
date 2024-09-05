const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  credentials: true,
}));

const connectionString = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', connectionString.replace(/\/\/.*@/, '//****:****@'));

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'uwish@gmail.com',
    pass: 'ikke for deg',
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePictureUrl: { type: String, default: 'https://asfaltios.com/static/media/imgrem.22b97312917819b10e60.png' },
  admin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainText: { type: String, required: true },
  fileUrl: { type: String },
  iconImageUrl: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isStaff: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);

app.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const username = email.split('@')[0];
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      admin: false
    });

    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);

    // Send confirmation email
    const mailOptions = {
      from: 'poscarspotify@gmail.com',
      to: email, // Sending to the email of the person registering
      subject: 'Welcome to Our Platform',
      text: `Hello ${username},\n\nThank you for registering on our platform. Your account has been successfully created.\n\nBest regards,\nThe Team`,
      html: `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xml:lang="en" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    
    
    
    
    
    
    
    
    
    
    
    
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&display=swap">   
    
    
    
    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
      body {height:100%;margin:0;padding:0;}
      body,table,td,th,a {-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
      table {border-collapse:collapse;border-spacing:0;}
      td,th {border-collapse:collapse;mso-line-height-rule:exactly;}
      table,td,th {mso-table-lspace:0pt;mso-table-rspace:0pt;}
      img {border:0 none;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
      a img {border:0 none;}
      button {margin:0 !important;padding:0 !important;display:block !important;}
      a[x-apple-data-detectors] {color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}
      #outlook a {padding:0;} 
      .ExternalClass {width:100%;}
      .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height:100%;}
      span.MsoHyperlink {mso-style-priority:99;color:inherit;}
      span.MsoHyperlinkFollowed {mso-style-priority:99;color:inherit;}
      li {text-align:-webkit-match-parent;display:list-item;}
      u + #body a {color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
      #bodyTable{height:100% !important;margin:0;padding:0;width:100% !important;}
      div[style*="margin:16px 0"] {margin:0 !important;}
      b {font-weight:900;}
      i {font-style:italic;}
    </style>
    
    <style>
      [style*="Nunito Sans"] {font-family: 'Nunito Sans', Arial, Helvetica, sans-serif!important;}
      a {text-decoration:none;}
      ul,ol {color:#000000;margin:0;padding-left:20px;}
      @media screen and (max-width:480px) {
        .two-columns .column,.three-columns .column {max-width:100% !important;}
        .four-columns .column {max-width:50% !important;}
        .two-columns .column .image-responsive img,.four-columns .column .image-responsive img,.image-responsive img {max-width:100% !important;}
        .three-columns .column .image-responsive img {max-width:50% !important;}
      }
      @media screen and (min-width:481px) and (max-width:680px) {
        .two-columns .column, .four-columns .column {max-width:50% !important;}
        .three-columns .column {max-width:33% !important;}
      }
    </style>
    <style>
      [size="7"] {font-size:48px !important;}
      [size="6"] {font-size:32px !important;}
      [size="5"] {font-size:24px !important;}
      [size="4"] {font-size:18px !important;}
      [size="3"] {font-size:16px !important;}
      [size="2"] {font-size:13px !important;}
      [size="1"] {font-size:10px !important;}
      @media screen and (max-width:480px) {
        [size="7"],[style="font-size:48px"] {font-size:48px !important;}
        [size="6"],[style="font-size:32px"] {font-size:32px !important;}
        [size="5"],[style="font-size:24px"] {font-size:24px !important;}
        [size="4"],[style="font-size:18px"] {font-size:18px !important;}
        [size="3"],[style="font-size:16px"] {font-size:16px !important;}
        [size="2"],[style="font-size:13px"] {font-size:13px !important;}
        [size="1"],[style="font-size:10px"] {font-size:10px !important;}
      }/* Rectangle */
    </style>
    <!--[if (mso)|(IE)]><style>li {text-align:-webkit-match-parent;display:list-item;text-indent:-1em;margin-left:20px;}</style><![endif]-->
  </head>
  <body style="background-color:#87d781;padding:0;" id="body">
    <div class="prehead-wrapper"><div style="display:none;max-height:0;overflow:hidden;" class="preheader">
        <div>Thank you for joining Asfaltios</div>
        <!--[if !mso]>
        &#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;&#8204;&#160;
        <![endif]-->
      </div></div>
<table border="0" role="presentation" cellpadding="0" cellspacing="0" style="width: 700px; " align="center">
<tr>
    <td style="background-color: white; padding: 20px; width: 100%; border-radius: 20px;">
<table border="0" role="presentation" cellpadding="0" cellspacing="0" style="width: 660px; " align="center">
    <tr>
        <td>
            <center>
                <table border="0" role="presentation" cellpadding="0" cellspacing="0" style="background-color: white; width: 100%;">  
                        <tr>
                            <td style="Padding-bottom: 20px; Padding-top: 20px;" align="center">
                                <img src="https://bdndev.agilliccdn.com/2iam3k/MjAyNDA5/MDQ=/MWQxNjcyODctM2M3My00YTY3LWE5MzktNmM1ZDE1MTA5YWI1.png" alt="logo" style="display: block; width: 10em; height: auto;"/>
                            </td>
                        </tr>
                    </table><table border="0" role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">  
                      <tr>
                     <td style="padding-bottom: 20px; padding-top: 20px; background: #b0fe25; background: linear-gradient(to right, #b0fe25, #c6ff5b); border-radius: 5px;" align="center">
                        <h1 style="color: #595659; font-family: 'Archivo Black', sans-serif; font-size: 4em; font-weight: 900; letter-spacing: 0.1em; padding-top: 10px;">
                            Thank you
                        </h1>
                        <p style="color: #595659; font-family: 'Archivo Black', sans-serif; font-size: 2em; Padding-top: 10px; font-weight: 700; letter-spacing: 0.1em;">
                            For signing up!
                        </p>
                        <img src="https://bdndev.agilliccdn.com/2iam3k/MjAyNDA5/MDQ=/Y2Q2YzU1ZGEtZjk2Ni00ODQ1LTkwMjctMmI3NDA4YjJmYTMw.png" alt="logo" style="display: block; width: 12em; height: auto; Padding-top: 50px;"/>
                         <p style="color: #595659; font-family: 'Archivo Black', sans-serif; font-size: 2em; Padding-top: 10px; font-weight: 400; letter-spacing: 0.1em;">
                         ${username}
                        </p>
                    </td>
                </tr>
            </table><table border="0" role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">  
                <tr>
                    <td style="padding-top: 20px;">
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 20px; padding-top: 20px; background: #b0fe25; background: linear-gradient(to right, #b0fe25, #c6ff5b); border-radius: 5px;" align="center">
                        <p style="color: #595659; font-family: 'Archivo Black', sans-serif; font-size: 2em; padding-top: 10px; font-weight: 700; letter-spacing: 0.1em;">
                            Go to your
                        </p>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td height="40"></td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <a style="padding: 20px 40px; background-color: white; color: #595659; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; font-family: 'Archivo Black', sans-serif; text-decoration: none; display: inline-block; font-size: 1.2em;" href="https://bdndev-stag.agillic.eu/web/namedservice/?ext=https%3A%2F%2Fasfaltios.com%2Fprofile&cs=hoJUrRiCLjLoaonv_YAhkw!!&lgn_uid=LkNtNjoxNzU2OTg4OTQ0LQOg_7hmlMoDaZHqrEssIw!!&ea=T5U49ZqHUjYx_7tUBIjkFNUO9ffg8ETtIl5LNIHrrexOl4g0vK0adnBlCA-39gUDbIb6sl85EqFDjd-shNlpBcSuwex_QnBTynwxGIpB28_CWS8o6QI9F2k72tWKsQCO:tpmBxVN5yTKDHfiimVqyYw==">
                                        Profile
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td height="20"></td>
                            </tr>
                            <tr>
                                <td style="Padding-top: 10px;" align="center">
                                    <a style="padding: 10px 20px; color: #595659; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; font-family: 'Archivo Black', sans-serif; text-decoration: underline; display: inline-block;" href="https://bdndev-stag.agillic.eu/web/namedservice/?ext=https%3A%2F%2Fasfaltios.com%2Fhome&cs=1us1Ckh79ZRtkgdRqKRXuQ!!&lgn_uid=LkNtNjoxNzU2OTg4OTQ0LQOg_7hmlMoDaZHqrEssIw!!&ea=xpxVpIkLPsJ1FFVx6T3NDgwOf1qS1d5xqmbMHa4VbXK4xdHjSdB5ZSd5RRDxdi6cnq002h1U4wCsr8kBqdcQBN0D9pGi4MsyrJ7ulWM2B5eDIJDrvqW_vjWjkaRV7ikS:m-4_hG9nzJVsDpMJG4upcA==">
                                        Home
                                    </a>
                                    <a style="padding: 10px 20px; color: #595659; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; font-family: 'Archivo Black', sans-serif; text-decoration: underline; display: inline-block;" href="https://bdndev-stag.agillic.eu/web/namedservice/?ext=https%3A%2F%2Fasfaltios.com%2Fcontact&cs=9lZkItgyyH61bOodxFio1g!!&lgn_uid=LkNtNjoxNzU2OTg4OTQ0LQOg_7hmlMoDaZHqrEssIw!!&ea=3xC14B0CFvLPVdpXQnlF9hUzPdwmuOGCB9VctQdYr7BVVdwr2g78C80ZhhC2q-TSVoOpCdi7Yz_Ja3Kj_jBjlA-5pSHt-FSalk_b3Y9NcvyqcGJBXahxbN-T6KYBuDK4:5dqObumdwL-MrZXL0DVDWg==">
                                        Contact
                                    </a>
                                    <a style="padding: 10px 20px; color: #595659; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; font-family: 'Archivo Black', sans-serif; text-decoration: underline; display: inline-block;" href="https://bdndev-stag.agillic.eu/web/namedservice/?ext=https%3A%2F%2Fasfaltios.com%2Fplugins&cs=CAp0f4zmLj0Z3ALJxKj_3Q!!&lgn_uid=LkNtNjoxNzU2OTg4OTQ0LQOg_7hmlMoDaZHqrEssIw!!&ea=yIJwEuE6w0eDQ4pceC2DbZtENVh5owjDQhx62Sp4INgtLe5zNanQqbp2dlM3qa2bs6nzUxYLHHFzArm3c2xP2Ets3tscYIp3UiFekm0yjqNImbKG4mqaO9-H1CeCPr29:KMSJcVw6zR_qcS6zn7wktA==">
                                        Plugins
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 20px; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #595659;">
                        &copy; Asfaltios 2024. All rights reserved.
                    </td>
                </tr>
            </table>
            </center>    
        </td>
    </tr>
</table>
            </td>
    </tr>
</table>
<!--<a href="https://bdndev-stag.agillic.eu/api/api/checker/click?ea=CU6UXhGi3war5T7dBeDhtQKBRrLrDSgILuigZ5U_ONnsOAyXDKWhpICnAdUXh_niHQC14LgXXR0HCsljhypARm7kqF33hLkNnpRcqWbtYv4=:sh3FTrHypWhmSbABhwEekA==">Text</a>--></body>
</html>
`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.cookie('isLoggedIn', true, { httpOnly: true, sameSite: 'strict' });
    res.cookie('userId', savedUser._id, { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user) {
      return res.status(400).json({ error: 'Username or email not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.cookie('isLoggedIn', true, { httpOnly: true, sameSite: 'strict' });
    res.cookie('userId', user._id, { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'User logged in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      profilePictureUrl: user.profilePictureUrl,
      admin: user.admin
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

app.post('/api/users/:userId/updateProfilePicture', async (req, res) => {
  const { userId } = req.params;
  const { profilePictureUrl } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profilePictureUrl = profilePictureUrl;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated successfully', profilePictureUrl });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the profile picture' });
  }
});

app.post('/upload', async (req, res) => {
  try {
    const { title, mainText, fileUrl, iconImageUrl } = req.body;

    if (!iconImageUrl) {
      return res.status(400).json({ error: 'iconImageUrl is required' });
    }

    const newItem = new Item({
      title,
      mainText,
      fileUrl,
      iconImageUrl
    });

    await newItem.save();
    res.status(200).json({ message: 'Item uploaded successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/list/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  const { sort, category } = req.query;

  try {
    const query = { title: { $regex: searchTerm, $options: 'i' } };
    if (category) {
      query.category = category;
    }

    const items = await Item.find(query).sort(sort ? { downloads: sort === 'desc' ? -1 : 1 } : {});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the items' });
  }
});

app.post('/api/chat/send', async (req, res) => {
  const { userId, text, isStaff } = req.body;

  try {
    const newMessage = new Message({ userId, text, isStaff });
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
});

app.get('/api/chat/messages/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({ userId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});

app.get('/api/chat/active', async (req, res) => {
  try {
    const activeChats = await Message.aggregate([
      { $group: { _id: '$userId', lastMessage: { $last: '$$ROOT' } } },
      { $sort: { 'lastMessage.timestamp': -1 } }
    ]);
    res.status(200).json(activeChats);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching active chats' });
  }
});

app.delete('/api/chat/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await Message.deleteMany({ userId });
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the chat' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
