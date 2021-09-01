import nodemailer from 'nodemailer';

import config from '../config/secrets';
import logger from '../config/logger';

const mailTransportLoader = async () => {
  try {
    const transport = nodemailer.createTransport(config.email.smtp);

    if (config.env !== 'test') {
      await transport.verify();
    }

    return transport;
  } catch (error) {
    logger.warn(
      'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
    );
  }
};

export default mailTransportLoader;
