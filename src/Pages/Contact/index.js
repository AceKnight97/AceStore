import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { useHistory } from 'react-router-dom';
import emailjs, { init } from 'emailjs-com';
import { Form, Button, notification } from 'antd';
import apiKeys from '../../Constants/apiKeys';
import { useMergeState } from '../../Helpers/customHooks';
import MainHeader from '../Common/mainHeader';
import InputCT from '../../Components/Input/inputCT';

import MainFooter from '../Common/mainFooter';

init(apiKeys.USER_ID);

const Contact = (props) => {
  // const history = useHistory();
  const [state, setState] = useMergeState({
    subject: '',
    email: '',
    message: '',
    loading: false,
    cooldown: 0,
  });
  const {
    subject, message, loading, email, cooldown,
  } = state;

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setState({ cooldown: cooldown - 1 });
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => { };
  }, [state.cooldown]);

  const openNotificationWithIcon = (type = 'success') => {
    let message;
    let description;
    switch (type) {
      case 'success':
        message = 'Your mail is successfully sent to us, thank you!';
        description = 'We will answer your email as soon as possible. Please wait!';
        break;
      case 'warning':
        message = 'You are in cooldown duration!';
        description = 'Please wait for a min!';
        break;
      default:
        break;
    }
    notification[type]({
      message,
      description,
    });
  };

  const onSubmit = async (e) => {
    if (cooldown !== 0) {
      openNotificationWithIcon('warning');
      return;
    }
    console.log({ e });
    const sendingData = {
      subject, message, email,
    };
    console.log({ sendingData });
    try {
      const res = await emailjs.send(apiKeys.SERVICE_ID, apiKeys.TEMPLATE_ID, sendingData, apiKeys.USER_ID);
      // const res = { text: 'OK' };
      console.log({ res });
      if (res?.text === 'OK') {
        openNotificationWithIcon();
        setState({ cooldown: 60 });
      }
    } catch (error) {
      console.log('Failed to send email: ', error);
    }
  };

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const showInputForm = () => (
    <Form
      name='basic'
      className='contact-form'
      initialValues={{ remember: false }}
      onFinish={onSubmit}
      onFinishFailed={() => console.log('fail')}
    >
      <Form.Item className='mb0'>
        <InputCT
          name='subject'
          title='The Subject:'
          placeholder='Order a website...'
          value={subject}
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item className='mb0-mt16'>
        <InputCT
          name='email'
          className='mt16'
          title='Your Email:'
          placeholder='ClarkKent@superman.com'
          value={email}
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item className='mb0-mt16'>
        <InputCT
          name='message'
          title='Your Message:'
          type='TEXTAREA'
          onChange={onChange}
          value={message}
          placeholder='I want to ...'
        />
      </Form.Item>

      <Form.Item className='mb0-mt40'>
        <Button disabled={!message} loading={loading} type='primary' block htmlType='submit'>
          Send Email
        </Button>
      </Form.Item>

      {
        cooldown !== 0 && (
        <div>
          <span>{`Please wait for ${cooldown}s to send another email!`}</span>
        </div>
        )
      }
    </Form>
  );

  return (
    <div className='contact-main'>
      {showInputForm()}
    </div>
  );
};

Contact.defaultProps = {
};
Contact.propTypes = {
};

export default Contact;
