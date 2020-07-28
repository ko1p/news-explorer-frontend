const blockForm = (status, searchBtn, searchForm) => {
  if (status === 'on') {
    searchBtn.setAttribute('disabled', 'disabled');
    searchForm.searchInput.setAttribute('disabled', 'disabled');
  } else {
    searchBtn.removeAttribute('disabled', 'disabled');
    searchForm.searchInput.removeAttribute('disabled', 'disabled');
  }
};

export { blockForm as default };
