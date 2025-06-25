const DashboardF = () => {
  return (
    <div className="min-h-screen pt-16">
      {" "}
      {/* pt-16 para el navbar */}
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard de Facturación
          </h1>
        </div>

        {/* Grid de contenido (2 columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {/* Columna 1 */}
          <div className="space-y-6">
            <section className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Sección 1</h2>
              {/* Contenido aquí */}
            </section>

            <section className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Sección 2</h2>
              {/* Contenido aquí */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardF;