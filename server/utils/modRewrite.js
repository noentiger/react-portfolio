export const modRewrite = (req, res, next) => {
  if (req.headers.host.slice(0, 4) === 'www.') {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  if (req.headers.host === '95.85.61.66') {
    return res.redirect(301, 'http://kimwijk.com');
  }
  return next();
};
