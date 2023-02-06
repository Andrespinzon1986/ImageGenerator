import Joi from "joi";
import { OTPVerification, User } from "../models/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";

export const mailController = {
  async sendOtp(req, res, next) {
    try {
      const { _id, email } = req.user;
      // delete all previous otps
      await OTPVerification.deleteMany({ userId: _id });
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

      const hashedOtp = await bcrypt.hash(otp, 10);
      await OTPVerification.create({
        userId: _id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000, //1hr
      });

      await transporter.sendMail({
        from: '"hashtech #️⃣" <hashmatw555@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Email verification code: ${otp}`, // Subject line
        html: ` <div style="text-align:center;">
  
        <div style="background:#0a66c2;padding:20px;color:white">
          <h3>Thankyou for choosing DALL.E</h3>
          <p>Verify Your E-mail Address</p>
        </div>
       
        <div style="padding:20px;">
          <p>You're almost ready to start enjoying DALL.E.</p>
          <p>
            Simply confirm that ${email} is your e-mail address by
            using this code:
          </p>
          <h1>${otp}</h1>
          <p>This code will expire in 1 hour</p>
          <p>Thanks</p>
        </div>
  
        <div style="background:lightgray;padding:20px;">
          <h4>Get in touch</h4>
          <p>
            <a style="color:white;" href="tel:7006600835">7006600835</a>
          </p>
          <p>
            <a style="color:white;" href="mailto:hashmatwani@icloud.com">hashmatwani@icloud.com</a>
          </p>
        </div>
  
      </div>
        `,
      });

      return res.status(201).json({
        success: true,
        message: "Otp sent successfully. Please check your mail",
        // data: { userId: _id, email },
      });
    } catch (err) {
      return next(err);
    }
  },

  async verifyOtp(req, res, next) {
    try {
      // validation
      const validationSchema = Joi.object({
        userId: Joi.string().required(),
        otp: Joi.string().min(4).max(4).required(),
      });

      const { error } = validationSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      // check database
      const { userId, otp } = req.body;
      const user = await User.findById(userId);
      if (user?.verified) {
        return next(CustomErrorHandler.alreadyExist("User already verified"));
      }

      const otpVerificationRecord = await OTPVerification.findOne({ userId });
      if (!otpVerificationRecord) {
        return next(
          CustomErrorHandler.invalidCredentials("Invalid otp. Please try again")
        );
      }
      const { expiresAt } = otpVerificationRecord;
      const { otp: hashedOtp } = otpVerificationRecord;

      // if expired
      if (expiresAt < Date.now()) {
        await OTPVerification.deleteMany({ userId });
        return next(
          CustomErrorHandler.invalidCredentials(
            "Otp expired. Please request new one"
          )
        );
      }

      const match = await bcrypt.compare(otp, hashedOtp);
      if (!match) {
        return next(
          CustomErrorHandler.invalidCredentials("Invalid otp. Please try again")
        );
      }

      await User.findByIdAndUpdate(userId, { verified: true });
      // delete otps
      await OTPVerification.deleteMany({ userId });

      return res.json({
        Success: true,
        message: "Email verified successfully..!",
      });
    } catch (err) {
      next(err);
    }
  },
};

// export const sendOTPVerifcationMail = async ({ _id, email }, res, next) => {};
