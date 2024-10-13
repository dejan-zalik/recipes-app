const HomePage = () => {
  const recipes = [
    {
      _id: '1',
      name: 'Fried bananas',
      description: 'You deserve that dessert',
    },
    {
      _id: '2',
      name: 'Veggie Quiche',
      description: 'So fluffy and delicious',
    },
    {
      _id: '3',
      name: 'Chocolate cake',
      description: 'Richer than Warren Buffet',
    },
    {
      _id: '4',
      name: 'Nut Power Bars',
      description: 'Extra nuts, extra strength',
    },
    {
      _id: '5',
      name: 'Spaghetti Carbonara',
      description: 'Classic and delicious',
    },
    { _id: '6', name: 'Lentil soup', description: 'For the cold days' },
  ];
  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe, _id) => (
            <div key={recipe._id} className="rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                  <h3 className="text-xl font-bold blur-sm">{recipe.name}</h3>
                </div>
                <div className="border border-primary-content mb-5 blur-sm"></div>
                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                    <span className="text-orange-700 blur-sm">
                      {recipe.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
