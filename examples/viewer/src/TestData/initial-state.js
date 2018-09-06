/* eslint-disable */
const TestData = {
  onlyText: {
    entityMap: {},
    blocks: [
      {
        key: "5g8yu",
        text: "Hello text only #hashtag test.com",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ]
  },
  softNewLine: {
    blocks: [
      {
        key: "4rcs3",
        text: "test me!hi, my name is Dor. \nI'm an idiot",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 8,
            style: "inline-header-one"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "c926g",
        text: "one more block \nand this is a normal text",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 14,
            style: "inline-header-one"
          }
        ],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  },
  lists: {
    blocks: [
      {
        key: "b1jra",
        text: "h2test",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: "inline-header-one"
          },
          {
            offset: 0,
            length: 6,
            style: "BOLD"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "9ne2e",
        text: "h3test",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: "inline-header-two"
          },
          {
            offset: 0,
            length: 6,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "6gc05",
        text: "h4test",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: "inline-header-three"
          },
          {
            offset: 0,
            length: 6,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "3k78h",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "4vk1l",
        text: "h2\ntest",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: "inline-header-one"
          },
          {
            offset: 0,
            length: 7,
            style: "BOLD"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "f76qt",
        text: "h3\ntest",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: "inline-header-two"
          },
          {
            offset: 0,
            length: 7,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "dc2cf",
        text: "h4\ntest",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: "inline-header-three"
          },
          {
            offset: 0,
            length: 7,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  },
  links: {
    blocks: [
      {
        key: "foo",
        text:
          "Search was Google’s only unambiguous win, as well as its primary source of revenue, so when Amazon rapidly surpassed Google as the top product search destination, Google’s foundations began to falter. As many noted at the time, the online advertising industry experienced a major shift from search to discovery in the mid-2010s.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 57,
            length: 25,
            key: 0
          },
          {
            offset: 99,
            length: 24,
            key: 1
          },
          {
            offset: 204,
            length: 10,
            key: 2
          }
        ],
        data: {}
      }
    ],
    entityMap: {
      "0": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "http://www.cnbc.com/2017/01/26/googlealphabet-reports-fourth-quarter-2016-earnings-q4.html",
          rel: "noopener",
          target: "_blank",
          url:
            "http://www.cnbc.com/2017/01/26/googlealphabet-reports-fourth-quarter-2016-earnings-q4.html"
        }
      },
      "1": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "http://www.geekwire.com/2017/amazon-continues-grow-lead-google-starting-point-online-shoppers/",
          rel: "noopener",
          target: "_blank",
          url:
            "http://www.geekwire.com/2017/amazon-continues-grow-lead-google-starting-point-online-shoppers/"
        }
      },
      "2": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "https://techcrunch.com/2016/08/11/google-isnt-safe-from-yahoos-fate/",
          rel: "noopener",
          target: "_blank",
          url:
            "https://techcrunch.com/2016/08/11/google-isnt-safe-from-yahoos-fate/"
        }
      }
    }
  },
  legacyVideo: {
    entityMap: {
      "0": {
        type: "VIDEO-EMBED",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/watch?v=eqZVIiD6wSg",
          config: { size: "content" }
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  video: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-video",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/watch?v=eqZVIiD6wSg"
        },
        config: {
          alignment: "center",
          size: "content",
          key: "ov8f"
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  html: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-html",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/embed/owsfdh4gxyc",
          srcType: "url",
          config: {
            width: 500,
            height: 200,
            safe: true
          }
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  divider: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-divider",
        mutability: "IMMUTABLE",
        data: {
          type: "double",
          config: {
            size: "large"
          }
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  full: {
    entityMap: {
      "4": {
        type: "wix-draft-plugin-html",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/embed/owsfdh4gxyc",
          config: {
            width: 200,
            height: 200,
            safe: true,
            isSrc: true
          }
        }
      },
      "5": {
        type: "wix-draft-plugin-html",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/embed/owsfdh4gxyc",
          srcType: "url",
          config: {
            width: 500,
            height: 200,
            safe: true
          }
        }
      },
      "6": {
        type: "wix-draft-plugin-divider",
        mutability: "IMMUTABLE",
        data: {
          type: "dashed",
          config: {
            size: "medium"
          }
        }
      }
    },
    blocks: [
      {
        key: "9gm3s",
        text:
          "Spicy jalapeno #bacon ipsum dolor amet kevin shank ground round, andouille tail shoulder venison strip steak biltong pastrami alcatra ribeye. Porchetta doner tail brisket chicken. Shank jerky flank, pastrami frankfurter hamburger burgdoggen filet mignon salami pork chop. Jerky swine short loin picanha porchetta, prosciutto short ribs jowl chuck burgdoggen brisket turkey.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 6
          }
        ],
        data: {}
      },
      {
        key: "ov8w",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 4
          }
        ],
        data: {}
      },
      {
        key: "ov8t",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 5
          }
        ],
        data: {}
      },
      {
        key: "e23a8",
        text:
          "Meatball.com rump tri-tip short ribs frankfurter chuck. Salami turkey ham, ball tip shankle chicken pork jerky venison beef ribs pastrami sausage bresaola. Beef ribs pork salami fatback tenderloin cupim, picanha porchetta pancetta hamburger pig pork loin chuck jerky bresaola. T-bone biltong landjaeger ham hock meatball tri-tip pancetta kevin chicken turducken drumstick tenderloin beef ribs tail. Sausage t-bone ham hock, bacon chicken jowl venison turkey bresaola tongue hamburger.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "5g8yu",
        text:
          "Biltong landjaeger andouille, doner prosciutto tri-tip sirloin shank. Ribeye capicola biltong pastrami burgdoggen. Filet mignon kielbasa capicola landjaeger pig hamburger, corned beef meatloaf swine meatball. Frankfurter brisket rump, pork fatback strip steak boudin cupim landjaeger sirloin venison pastrami cow pork chop chuck.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ]
  }
};

export default TestData;
