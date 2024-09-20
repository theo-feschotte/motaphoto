// const coreBlocksArray = [
//   "core/paragraph",
//   "core/heading",
//   "core/list",
//   "core/image",
//   "core/columns",
//   "core/column",
// ];

// function addParentAttribute(settings, name) {
//   if (!coreBlocksArray.includes(name)) {
//     return settings;
//   }

//   return Object.assign(settings, {
//     parent: ["core/columns", "core/column", "acf/block"],
//   });
// }

// wp.hooks.addFilter(
//   "blocks.registerBlockType",
//   "my-plugin/class-names/list-block",
//   addParentAttribute
// );

wp.domReady(() => {
  // remove comment panel
  wp.data.dispatch("core/edit-post").removeEditorPanel("discussion-panel"); // Discussion

  // add class "is-inview" to every element with data-scroll attribute inside a block
  // const blocks = document.querySelectorAll(".wp-block");
  // console.log(blocks);
  // blocks.forEach((block) => {
  //   const scrollElements = block.querySelectorAll("[data-scroll]");
  //   scrollElements.forEach((element) => {
  //     element.classList.add("is-inview");
  //   });
  // });

  // Block titles styles
  // wp.domReady(() => {
  //   wp.blocks.registerBlockStyle("core/heading", [
  //     {
  //       name: "default",
  //       label: "Style 1",
  //       isDefault: true,
  //     },
  //     {
  //       name: "alt",
  //       label: "Style 2",
  //     },
  //     {
  //       name: "altt",
  //       label: "Style 3",
  //     },
  //   ]);
  // });

  // block button styles

  // Block buttons styles
  wp.blocks.unregisterBlockStyle("core/button", [
    "default",
    "outline",
    "squared",
    "fill",
  ]);
  // wp.blocks.registerBlockStyle("core/button", [
  //   {
  //     name: "c-button",
  //     label: "Normal",
  //     isDefault: true,
  //   },
  //   // {
  //   //   name: "border",
  //   //   label: "Contour",
  //   // },
  // ]);

  // Block quote styles
  wp.blocks.unregisterBlockStyle("core/quote", ["default", "plain", "large"]);
  wp.blocks.registerBlockStyle("core/quote", [
    {
      name: "default",
      label: "Normal",
      isDefault: true,
    },
    {
      name: "alt",
      label: "Alternatif",
    },
  ]);

  // Set default attributes/classes for the blocks
  // const setExtraPropsToBlockType = (props, blockType, attributes) => {
  //   const notDefined =
  //     typeof props.className === "undefined" || !props.className ? true : false;

  //   if (blockType.name === "core/quote") {
  //     return Object.assign(props, {
  //       "split-text": "word",
  //       "anim-text": "",
  //     });
  //   }

  //   if (blockType.name === "core/heading") {
  //     return Object.assign(props, {
  //       "split-text": "char",
  //       "anim-text": "",
  //     });
  //   }
  //   if (blockType.name === "core/paragraph") {
  //     return Object.assign(props, {
  //       "split-text": "line",
  //       "anim-text": "",
  //     });
  //   }

  //   return props;
  // };
  // wp.hooks.addFilter(
  //   "blocks.getSaveContent.extraProps",
  //   "your-namespace/block-filters",
  //   setExtraPropsToBlockType
  // );
});
