import Header from '../components/Header';
import setMobileMenu from './setMobileMenu';

const setHeader = (page, mainApi) => {
  mainApi.getUserData(localStorage.token)
    .then((res) => res.json())
    .then((res) => res.data)
    .then((userInfo) => {
      const props = {};
      props.isLoggedIn = true;
      localStorage.isLoggedIn = true;
      props.userName = userInfo.name;
      localStorage.userName = userInfo.name;
      props.color = page === 'articles' ? 'white' : 'black';
      localStorage.page = page;
      props.page = page;
      return props;
    })
    .then((props) => {
      setMobileMenu(props);
      const header = new Header(props);
      header.render();
      return header;
    })
    .catch((err) => console.log(err));
};

export { setHeader as default };
