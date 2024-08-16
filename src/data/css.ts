export const CSS = `html,
body {
  scroll-behavior: smooth !important;
}

.ck-content a {
  text-decoration: underline;
}

.ck-content ul {
  padding-left: 35px;
  line-height: 1.8;
}

._underline::after {
  content: '';
  /* background-color: var(--primary-color); */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  transition: all 0.3s ease-in;
}

._underline:hover::after {
  width: 100%;
}

.ql-editor {
  padding: 0 !important;
}

.ql-editor img {
  max-width: 100% !important;
}
`;
