// app/footer.tsx
// app/footer.tsx
const Footer = () => {
  return (
    <footer className='bg-gray-200 shadow-sm text-gray-600 text-center p-2 font-thin text-sm border-t border-gray-300'>
      <p>&copy; {new Date().getFullYear()} 나만의 레시피</p>
    </footer>
  );
};

export default Footer;
