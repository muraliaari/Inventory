import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import sgMail from '@sendgrid/mail';


const SendEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    sgMail.setApiKey(apiKey);
  }, []);

  const onSubmit = async (data) => {
    try {
      const msg = {
        to: data.email,
        from: 'kunashaari@gmail.com',
        subject: 'Bill Details',
        html: `<h1>Bill Details</h1>
          <p>Your bill details here</p>`,
      };

      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email id"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <button type="submit" className="button">Send Email</button>
      </form>
    </div>
  );
};

export default SendEmail;
