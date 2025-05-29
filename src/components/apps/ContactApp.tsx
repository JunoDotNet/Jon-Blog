'use client';

const ContactApp = () => {
  return (
    <div className="w-full h-full p-6 text-black bg-white overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="mb-2">Feel free to reach out via:</p>
      <ul className="list-disc list-inside">
        <li>Email: <a href="mailto:jonwickerd@gmail.com" className="text-blue-600 underline">jonwickerd@gmail.com</a></li>

        <li>LinkedIn: <a href="https://linkedin.com/in/jonathan-wickerd-b85240178" className="text-blue-600 underline" target="_blank">jonathan-wickerd</a></li>
        <li>GitHub: <a href="https://github.com/JunoDotNet" className="text-blue-600 underline" target="_blank">JunoDotNet</a></li>
      </ul>
    </div>
  );
};

export default ContactApp;
