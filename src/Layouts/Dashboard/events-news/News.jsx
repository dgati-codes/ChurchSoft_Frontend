function News() {
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className=" w-5xl">
          <div className="bg-white  rounded-2xl p-12">
            <h2 className="text-[20px] font-semibold mb-4">News</h2>
            <NewsItem
              title="GCCI has a new President!"
              image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              parag="The Great Commission church has elected Rev. S.V. Ansah as the new president. Read More"
            />
            <NewsItem
              title="GCCI makes a donation"
              parag="The GCCI makes a massive donation to the deaf and blind in the Central region. Read More"
              image="https://www.shutterstock.com/image-photo/male-volunteer-giving-food-donations-260nw-2467626911.jpg"
            />
            <NewsItem
              title="New Building, New Members!!!"
              parag="Massive building put up by the Great Commission church. Read More"
              image="https://th.bing.com/th/id/R.6fa09451c69ff1379a67dea9d98fd694?rik=0VQM%2fdM2LxnuOw&riu=http%3a%2f%2fhiddenarchitecture.net%2fwp-content%2fuploads%2f2015%2f05%2fewr-1024x1024.jpg&ehk=1vt2%2fSWqgB%2bd2egxY3QuCQL5EtMch759cLMLbZjlhwU%3d&risl=&pid=ImgRaw&r=0"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default News;

function NewsItem({ title, image, name, parag }) {
  return (
    <div className="mb-9 gap-2 flex text-center align-center justify-">
      <img
        src={image}
        alt={name}
        className="h-10 w-10 object-cover rounded-xl mb-3"
      />
      <div className=" ">
        <h4 className="text-[15px] text-start font-semibold">{title}</h4>
        <p className="text-[10px] text-start text-gray-600">{parag}</p>
        <p className="text-[15px] text-start text-gray-500">3 hours ago</p>
      </div>
    </div>
  );
}
