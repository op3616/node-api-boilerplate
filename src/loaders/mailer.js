import nodemailer from 'nodemailer';
import config from '../config/secretKeys';
import logger from '../config/logger';

const mailTransportLoader = async () => {
  try {
    const transport = nodemailer.createTransport(config.email.smtp);

    if (config.env !== 'test') {
      await transport.verify();
    }

    return transport;
  } catch (error) {
    logger.warn(error);
  }
};

export default mailTransportLoader;
