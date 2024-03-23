import Article from "./components/Article.tsx";

function App() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Article
        topic="Article"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida massa eget sodales tempor. Pellentesque vulputate elit quis mauris tempor, eu sagittis eros tincidunt. Maecenas quis rutrum lorem. Nullam facilisis eros vitae fermentum vehicula. Nullam eu vulputate metus. Nam gravida sodales nibh feugiat efficitur. Morbi eget metus eu purus porta ultrices. Nunc sollicitudin, augue ut suscipit semper, lorem odio sollicitudin mi, fermentum sagittis risus odio eu urna. Nulla pretium mollis sapien. In nec enim ex. Integer aliquam facilisis nunc, nec suscipit dui facilisis vel. Integer non mauris magna.

Proin scelerisque tincidunt erat nec gravida. Duis hendrerit lectus quis est vehicula, vel sollicitudin ante viverra. Quisque vitae ex eros. Maecenas rutrum neque a libero ultrices, sit amet fermentum velit dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec accumsan viverra justo tempus ornare. Proin dolor nulla, pulvinar ac enim bibendum, malesuada elementum nisl. Mauris justo ante, luctus et rhoncus a, volutpat at est. Maecenas eu rutrum nisl. Suspendisse mollis faucibus malesuada. Etiam risus dui, pellentesque vel lacus ac, luctus consectetur enim. Mauris mollis diam in ipsum placerat auctor. Ut tempus molestie ante, in molestie diam facilisis eget. Maecenas luctus pharetra scelerisque. Vivamus id condimentum mauris, quis consectetur erat.

Aliquam vehicula est in mauris pulvinar, vitae eleifend velit tincidunt. Vestibulum accumsan quam at eros ullamcorper fermentum. Fusce hendrerit eleifend nisi vel porttitor. Quisque bibendum dapibus elit vehicula varius. Sed ut laoreet urna. Aenean ac consectetur lorem. In molestie, purus eget venenatis hendrerit, tortor felis vestibulum justo, sit amet varius tortor odio sit amet est. Donec aliquam sit amet augue sed eleifend. Quisque posuere eleifend quam id ultricies. Mauris imperdiet justo et enim porta commodo. Morbi eget enim nisl. Nullam nisl odio, tempor id semper vestibulum, tristique sed ex. Proin dictum, metus ac venenatis tempus, libero nibh tincidunt erat, eu mattis ligula nisl et ipsum. Etiam tempor congue blandit.

Quisque elementum rhoncus ligula, sagittis varius sapien accumsan in. Nulla facilisi. Sed justo metus, pulvinar pulvinar turpis sed, dapibus iaculis purus. Etiam consequat, ex sed convallis fringilla, sapien est eleifend velit, id tempus magna turpis et odio. Aliquam vestibulum augue nec mi auctor, vel lacinia purus fermentum. Cras ac maximus diam, nec imperdiet magna. Aliquam erat volutpat. Phasellus eget pharetra libero. Integer luctus ligula eu nisi mattis pretium. Nulla facilisi.

Morbi mattis risus non dignissim lobortis. Morbi commodo mi ut tortor efficitur, id ultricies purus volutpat. Ut vel neque quis sapien facilisis tincidunt vel sed augue. Donec ut commodo magna. Sed metus nunc, tristique quis finibus sed, convallis eu ipsum. Proin eu nisl eu elit vehicula tincidunt sit amet a nisl. Nulla lorem ipsum, malesuada eu ante vitae, malesuada tristique libero. Etiam ut sapien sed nunc aliquet pharetra."
        tags={["lorem", "ipsum", "ArticuLearn"]}
      />
    </div>
  );
}

export default App;
