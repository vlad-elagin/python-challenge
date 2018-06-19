import router from '@router';
import axios from 'axios';

export const signUp = async (context, data) => {
  const res = await axios({
    method: 'POST',
    url: '/api/user/signup/',
    data,
  });

  if (res.status !== 201) {
      // validation errors or username taken
      context.commit('modal:open', {
        title: 'Error while signing up',
        message: 'Big bad python is complaining again:',
        errors: res.errors,
      });
      return;
  }

  // seems ok
  context.dispatch('MODAL_OPEN', {
    title: 'Welcome onboard!',
    message: 'Your account have been created, please login.',
    autoDismiss: 3,
  });

  router.push('/login');
};

export const signIn = async (context, data) => {
  const res = await axios({
    method: 'POST',
    url: '/api/user/signin/',
    data,
  });

  console.log(res);

  if (res.status !== 200) {
    context.commit('modal:open', {
      title: 'Error while signing in',
      message: 'Big bad python is complaining again:',
      errors: res.errors,
    });
  }

  context.commit('user:logged');
}
