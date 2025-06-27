import React, { useEffect, useState } from 'react';

const ClientCreationPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Activa la animación después de que el componente se monta
    setIsVisible(true);
  }, []);

  // Componente reutilizable para las "tarjetas" de input
  const InputCard = ({ children, title, description, delay }) => (
    <div
      className={`
        p-8               /* Aumentamos el padding para dar espacio al borde redondeado */
        mb-4              /* Espacio entre tarjetas, si es necesario */
        bg-gris-frio-claro/90 /* Tarjetas más claras, 90% opacidad */
        rounded-3xl       /* Hacemos los bordes muy redondeados, como un "squircle" o "pastilla" */
        shadow-lg         /* Sombra para profundidad */
        transform transition-all duration-700 ease-out origin-center relative
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 scale-95'} 
        animate-fadeInUpExt /* Usamos la animación definida en tailwind.config.js */
        flex flex-col justify-center items-center text-center /* Para centrar contenido si es necesario */
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {title && (
        <h3 className="text-2xl font-bold text-azul-oscuro-metalico mb-2"> {/* Título más grande y en negrita */}
          {title}
        </h3>
      )}
      {description && (
        <p className="text-base text-gray-700 mb-4"> {/* Descripción más grande */}
          {description}
        </p>
      )}
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-creacion-cliente flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo para un toque único (animaciones tipo blob) - Mantenidos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-azul-celeste-claro rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-one z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-azul-agua rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-two z-0"></div>

      {/* Contenido principal: Título y la Grid de "tarjetas" del formulario */}
      <div className="text-center mb-10 z-10"> {/* Margen inferior aumentado */}
        <h2 className="mt-2 text-5xl font-extrabold text-azul-oscuro-metalico drop-shadow-sm animate-fade-in-down-ext"> {/* Título más grande */}
          Crear Nuevo Cliente
        </h2>
        <p className="mt-4 text-lg text-azul-oscuro-metalico animate-slide-in-from-left-ext" style={{ animationDelay: '0.3s' }}> {/* Texto de descripción más grande */}
          Ingrese los datos del nuevo cliente para su registro en el sistema.
        </p>
      </div>

      {/* Contenedor de la Grid para las "tarjetas" de input */}
      <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full z-10" onSubmit={(e) => e.preventDefault()}> {/* Gap y max-w ajustados */}
        <InputCard title="Información Personal" delay={0.5}>
          <div className="space-y-6 w-full"> {/* Espaciado y ancho de los inputs */}
            <div>
              <label htmlFor="nombre-cliente" className="sr-only">Nombre completo</label>
              <input
                id="nombre-cliente"
                name="nombre"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                           border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                           focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                           transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label htmlFor="apellido-cliente" className="sr-only">Apellido completo</label>
              <input
                id="apellido-cliente"
                name="apellido"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                           border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                           focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                           transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
                placeholder="Apellido completo"
              />
            </div>
          </div>
        </InputCard>

        <InputCard title="Contacto" delay={0.7}>
          <div className="space-y-6 w-full">
            <div>
              <label htmlFor="email-address" className="sr-only">Correo Electrónico</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                           border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                           focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                           transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
                placeholder="ejemplo@dominio.com"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="sr-only">Número de Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                           border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                           focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                           transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
                placeholder="Ej. +593 99 123 4567"
              />
            </div>
          </div>
        </InputCard>

        {/* Nueva "tarjeta" para Cédula y RUC */}
        <InputCard title="Identificación" delay={0.9}>
          <div className="space-y-6 w-full">
            <div>
              <label htmlFor="cedula" className="sr-only">Número de Cédula</label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                           border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                           focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                           transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
                placeholder="Número de Cédula"
              />
            </div>
            <div>
              <label htmlFor="ruc" className="sr-only">Número de RUC</label>
              <input
                id="ruc"
                name="ruc"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                           border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                           focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                           transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
                placeholder="Número de RUC (Opcional)"
              />
            </div>
          </div>
        </InputCard>

        <InputCard title="Dirección" delay={1.1}>
          <div className="w-full">
            <label htmlFor="direccion" className="sr-only">Dirección</label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              autoComplete="street-address"
              required
              className="appearance-none rounded-full relative block w-full px-5 py-4 border 
                         border-gris-frio-claro placeholder-gray-500 text-azul-oscuro-metalico 
                         focus:outline-none focus:ring-2 focus:ring-azul-agua focus:border-azul-agua 
                         transition-all duration-200 ease-in-out bg-blanco-puro shadow-sm text-lg" /* Inputs con bordes redondeados, fondo blanco puro */
              placeholder="Dirección completa"
            />
          </div>
        </InputCard>

        {/* Botón de envío que ocupa las dos columnas en pantallas medianas y grandes */}
        <div className="md:col-span-2 mt-6 z-10" style={{ animationDelay: '1.3s' }}> {/* Margen superior aumentado */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xl font-bold rounded-full 
                       bg-azul-agua text-blanco-puro 
                       hover:bg-azul-oscuro-metalico hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-azul-agua focus:ring-offset-2 
                       transition-all duration-300 ease-in-out cursor-custom" /* Botón más grande, texto negrita, cursor custom */
          >
            Crear Cliente
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientCreationPage;