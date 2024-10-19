import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: "ar",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          Contract: {
            select: {
              client: "New",
            },
            titles: {
              personal: "Client Details",
              contract: "Contract Details",
            },
            labels: {
              code: "Code",
              email: "Email",
              password: "Password",
              name: "Name",
              mobile: "Mobile",
              location: "Location",
              assignDate: "Assign Date",
              start: "Start",
              end: "End",
              status: "Status",
              stage: "Stage",
              cost: "Total Cost",
              stageCost: "Stage cost",
              variation: "Variation",
              download: "Download",
              owner: "Salesman",
            },
            btns: {
              delete: "Delete",
              edit: "Edit",
              add: "Add",
              addVariation: "Add",
              cancelvariation: "Cancel",
            },
            cities: {
              1: "Abu Dhabi",
              2: "Al Ain",
              3: "Liwa",
              4: "Dubai",
              5: "Sharjah",
              6: "Ajman",
              7: "Umm Al Quawin",
              8: "Ras Al Khaimah",
              9: "Fujairah",
              10: "Dhafra",
            },
            sales: {
              name: "Name",
              monthly_target: "Monthly Target",
            },
          },
          Administrator: {
            labels: {
              name: "Name",
              target: "Target",
            },
            btns: {
              add: "Add",
              cancel: "Cancel",
            },
          },
          Login: {
            para: "Pleas Enter the details below to continue",
            title: "Login Now!",
            username: "username",
            password: "password",
            btn: "Login",
            err: "wrong email or password!",
            type1: "Admin Login?",
            type2: "Client Login?",
          },
          Question: {
            q1: "Agree",
            q2: "Login",
            submit: "Submit",
            back: "Back",
            skip: "Maybe later!",
            title:
              "Someone from sales department will contact you for more details",
            error: "pleas enter valid country code",
          },
          Logo: {
            name1: "House",
            name2: "Design",
            field: "Prefab. construction",
          },

          NavBar: {
            lang: "English",
            city: "Language",
            contact: "Call us",
          },
          Home: {
            country: { 1: "Abu Dhabi", 2: "Al Ain", 3: "Dubai" },
            projects: "Projects",
            details: "details",
            schedule: "Construction Schedule",
            sechedulePara:
              "The Modular assembly process and the on-site construction occur simultaneously resulting in the process being 30-50% less time consuming than the traditional construction process.",
            cost: "Const Effective",
            costPara:
              "Construction occurs in a controlled environment where thorough inspections are carried out during the entire process to ensure each project matches in terms of high standards and quality.",
            assurance: "Quality Assurance",
            assurancePara:
              " To ensure long term durability, the modular process utilizes robust building materials that aid in sound insulation, fire proofing and energy preservation. All to ensure that your desired structure is built to last.",
            modular: "Prefabricated Modules",
            smallTitle: "Why Us ?",
            container: "3D Designs",
            roof: "Roof",
            job: "What We Do",
            typeWriter: {
              1: "Build Your House",
              2: "Modern Designs",
              3: "Best Quality",
            },
            profile: "Profile",
            sites: "Sites",
            services: "Services",
            home: "Home",
            call: "Call Us",
            intro: "",
            view: {
              1: "Best Quality",
              2: "Modern Solution",
              3: "Aware To Details",
            },
            links: {
              1: {
                1: "Designs & Schemas",
                2: "Schemas",
                3: "3D Designs",
              },
              2: {
                1: "Company",
                2: "House Design Abu Dhabi",
                3: "Projects",
              },
              3: {
                1: "Location",
                2: {
                  1: "Al Ain, Oud Altouba, Al bin Taleb St",
                  2: "Building 3 beside ADCB Bank",
                  3: "Floor 2, Office(12)",
                },
              },
              4: {
                1: "Call Us",
                2: "Get in touch",
              },
              5: {
                1: "Follow Us",
              },
            },
          },
          Projects: {
            headLine: "Projects",
            content:
              "​Many and various projects have been carried out in different emirates of the country and with different designs according to the customers request. On this page you will find pictures of some of the previously implemented projects, we wish you an enjoyable viewing.",
            details: "more details",
            projectDesc: {
              1: {
                Loc: "Al Ain - Al Rammah",
                Area: "116",
                Desc: "Majles +  Bathroom & Washrooms",
              },

              2: {
                Loc: "Abu Dhabi - El Samha",
                Area: "241",
                Desc: "Majles + Store + Master Bedroom + 2 Bedrooms + Office + Bathroom & Washrooms",
              },
              3: {
                Loc: "Al Ain - Zakher",
                Area: "133",
                Desc: "Majles + Store + Master Bedroom + Bathroom & Washrooms",
              },
              4: {
                Loc: "Al Ain - Al Tawia",
                Area: "214",
                Desc: "Majles + Master Bedroom + 3 Bedrooms + Bathroom & Washrooms",
              },
              5: {
                Loc: "Abu Dhabi - Al-Rahaba",
                Area: "508",
                Desc: "Majles + Master Bedroom + 4 Bedrooms + Bathroom & Washrooms",
              },
              6: {
                Loc: "Abu Dhabi - Al Khatam",
                Area: "306",
              },
              7: {
                Loc: "Al Ain - Al Markhania",
                Area: "124",
                Desc: "Majles + Kitchen + Bathroom & Washrooms",
              },
              8: {
                Loc: " Abu Dhabi - Mohamed Bin Zayed",
                Area: "131",
                Desc: "Majles + Kitchen+ 2 Bedrooms + Store + Bathroom & Washrooms",
              },
              9: {
                Loc: " Abu Dhabi - Shakhbot",
                Area: "100",
                Desc: "Majles + 2  Bedroom + Bathroom & Washrooms",
              },
              10: {
                Loc: "Abu Dhabi - Bin Al Gesreen",
                Area: "143",
                Desc: "Majles + Bathroom & Washrooms + Family Hall",
              },
              11: {
                Loc: "Dubai",
                Area: "138",
                Desc: "Majles + Lobby + 2 Master bedrooms",
              },
              12: {
                Loc: "Dubai",
                Area: "203",
                Desc: "Majles + Bathroom & Washrooms + Family Hall + 2 bedrooms + Master bedroom + kitchen",
              },
              13: {
                Loc: "Dubai",
                Area: "175",
                Desc: "Family Hall + 2 master bedrooms + Store + Kitchen",
              },
            },
            back: {
              1: "Back",
            },
          },
          Company: {
            contact: "Call Us",
            intro: {
              title: "Who We Are",
              intro:
                "House Design Company for prefabricated construction is a company based in Al Ain and includes a group of professional engineers and designers since 2006 in the supply and installation of prefabricated buildings and high quality residential units. The scope of the company's work is limited to the city of Dubai, Sharjah, Ajman, Abu Dhabi and its affiliated regions. Al Ain and Al Dhafra",
            },
            question: {
              ques: "Prefab construction",
              ans: "Ready-made construction has different standards from one company to another. There is construction using wood, and there are also caravans, which are considered ready-made construction, but in House Design we rely entirely on steel (steel) in the construction of housing units for the purpose of reaching the highest degree of solidity And durability, in addition to the use of sound, heat and moisture insulating materials and other materials that ensure customer satisfaction in the end.",
            },
            afterService: {
              ques: "Warranty",
              ans1: " Upon completion of the construction work and handing over the building to the client, House Design offers the following guarantees:-",
              ans2: "- Home maintenance guarantee for one year after receipt",
              ans3: "- 5 years warranty on the roof",
              ans4: "- 25 years warranty on the steel structure of the building",
            },
            nav: "Evaluation",

            Contact: {
              departments: {
                dp1: "General Manager",
                dp2: "Sales Department",
                dp3: "Technical Department",
                dp4: "Co. House Design",
              },
              guide: "Press to call",
            },
            material: {
              steel: "Steel",
              dye: "Dye",
            },

            interaction: {
              Desc: {
                1: "Interactions",
                2: "Satisfaction",
                3: "Safety",
              },
            },
          },

          Contact: {
            headLine: "Contact",
            1: "FullName",
            2: "E-Mail",
            3: "Message",
            4: "Send",
          },

          Designs: {
            headLine: "Designs",
            subHeadLine: "3D-Designs",
          },
        },
      },
      ar: {
        translation: {
          Login: {
            para: "من فضلك قم بإدخال جميع البيانات للإستمرار",
            title: "دخول عملاء الشركة",
            title2: "لمتابعة حالة المشروع",
            title3: " دخول عملاء الشركة لمتابعة حالة المشروع",
            username: "اسم المستخدم",
            password: "كلمة المرور",
            btn: "دخول",
            err: "خطأ بإسم المستخدم او كلمة السر",
            type1: "دخول مسؤول النظام؟",
            type2: "دخول العميل؟",
          },
          Question: {
            q1: "موافق",
            q2: "تسجيل دخول",
            submit: "متابعة",
            back: "عودة",
            skip: "لاحقا",
            title: "سيقوم أحد من فريق المبيعات بالتواصل معك لمزيد من التفاصيل",
            error: "كود المنطقة غير صحيح",
          },
          Logo: {
            name1: "هاوس",
            name2: "ديزاين",
            field: "للبناء الجاهز",
          },
          NavBar: {
            lang: "Arabic",
            city: "اللغة",
            contact: "اتصل بنا",
          },
          Home: {
            country: { 1: "أبو ظبي", 2: "مدينة العين", 3: "دبي" },
            projects: "المشاريع",
            details: "تفاصيل",
            sechedulePara:
              "تحدث عملية التجميع المعيارية والبناء في الموقع في وقت واحد مما يؤدي إلى أن تستغرق العملية وقتًا أقل بنسبة 30-50٪ من عملية البناء التقليدية.",
            costPara:
              "يحدث البناء في بيئة خاضعة للرقابة حيث يتم إجراء عمليات تفتيش شاملة خلال العملية بأكملها لضمان تطابق كل مشروع من حيث المعايير والجودة العالية.",
            assurancePara:
              "لضمان المتانة على المدى الطويل ، تستخدم العملية المعيارية مواد بناء قوية تساعد في عزل الصوت ومقاومة الحريق والحفاظ على الطاقة. كل ذلك لضمان أن الهيكل الذي تريده قد تم بناؤه ليدوم.",
            schedule: "فترة التنفيذ",
            cost: "التكلفة",
            assurance: "الضمان",
            modular: "البناء الجاهز",
            smallTitle: "لماذا نحن ؟ ",
            roof: "سقفيات",
            container: "تصاميم قابلة للتنفيذ",
            job: "الأعمال",
            typeWriter: {
              1: "قم بتصميم منزلك",
              2: "أحدث التصاميم",
              3: "جودة أعلى",
            },
            profile: "نبذة",
            sites: "المشاريع",
            services: "الخدمات",
            home: "الصفحة الرئيسية",
            intro: "",
            call: "اتصل بنا",
            view: {
              1: "جودة أعلي",
              2: "تصميمات عصرية",
              3: "نهتم بأدق التفاصيل",
            },
            links: {
              1: {
                1: "تصميمات ومخططات",
                2: "مخططات",
                3: "تصميمات جرافيكية",
              },
              2: {
                1: "هاوس ديزاين",
                2: "أبو ظبي",
                3: "المشاريع",
              },
              3: {
                1: "الموقع",
                2: {
                  1: "العين ، عود التوبة ، شارع بن طالب",
                  2: "مبنى 3 بجوار مصرف أبوظبي الإسلامي",
                  3: "الطابق 2، مكتب (12)",
                },
              },
              4: {
                1: "للدعم الفني",
                2: "اتصل بنا",
              },
              5: {
                1: "قم بمتابعتنا علي",
              },
            },
          },
          Projects: {
            headLine: "المشاريع",
            content:
              "​تم عمل مشاريع عديدة و متنوعة في مختلف امارات الدولة و بتصاميم مختلفة بحسب طلب العملاء في هذه الصفحة ستجدون صورا عن بعض المشاريع التي تم تنفيذها مسبقا، نتمنى لكم مشاهدة ممتعة ",
            details: "مزيد من التفاصيل",
            projectDesc: {
              1: {
                Loc: "العين - الرماح",
                Area: "116",
                Desc: "مجلس + حمام ومغاسل",
              },

              2: {
                Loc: "أبو ظبي - السمحة",
                Area: "241",
                Desc: "مجلس + مخزن + غرفة نوم ماستر + 2 غرفة نوم + مكتب + حمام ومغاسل",
              },
              3: {
                Loc: "العين - زاخر",
                Area: "133",
                Desc: "مجلس + مخزن + غرفة نوم ماستر +  حمام ومغاسل",
              },
              4: {
                Loc: " العين - الطوية",
                Area: "214",
                Desc: "مجلس + غرفة نوم ماستر + 3 غرفة نوم + حمام ومغاسل",
              },
              5: {
                Loc: "أبو ظبي - الرحبة",
                Area: "508",
                Desc: "مجلس + غرفة نوم ماستر + 4 غرفة نوم + حمام ومغاسل",
              },
              6: {
                Loc: "أبو ظبي - الختم",
                Area: "306",
              },
              7: {
                Loc: "العين - المرخانية",
                Area: "124",
                Desc: "مجلس + مطبخ تحضيري + حمام ومغاسل",
              },
              8: {
                Loc: "أبو ظبي - محمد بن زايد",
                Area: "131",
                Desc: "مجلس + مطبخ+ 2 غرفة نوم + مخزن + حمام ومغاسل",
              },
              9: {
                Loc: "أبو ظبي - شخبوط",
                Area: "100",
                Desc: "مجلس + 2 غرفة نوم + حمام ومغاسل",
              },
              10: {
                Loc: "أبو ظبي - بين الجسرين",
                Area: "143",
                Desc: "مجلس + حمام ومغاسل + صالة طعام",
              },
              11: {
                Loc: "دبي",
                Area: "138",
                Desc: "مجلس + غرفتين نوم ماستر + صالة طعام",
              },
              12: {
                Loc: "دبي",
                Area: "203",
                Desc: "مجلس + حمام ومغاسل +  غرفتين نوم + غرفة منوم ماستر + مطبخ تحضيري",
              },
              13: {
                Loc: "دبي",
                Area: "175",
                Desc: "مجلس + حمام ومغاسل +  مطبخ تحضيري + غرفتين ماستر",
              },
            },
            back: {
              1: "عودة",
            },
          },
          Company: {
            contact: "اتصل بنا",
            intro: {
              title: "من نحن",
              intro:
                " شركة هاوس ديزان للبناء الجاهز هي شركة مقرها مدينة العيـــــــن و تضم نخبة من المهندسين و المصممين المحترفين من الذين تجاوزت خبراتهم العملية تسعة أعوام في توريـــــــد و تركيب البنــــاء الجاهز و الوحدات السكنية ذات الجودة العالية.يقتصر نطاق عمـــل الشركة في جزيرة أبوظبي و المناطق التابعةلها مدينــــــة العين و المنطقة الغربية ",
            },
            question: {
              ques: " البناء الجاهز",
              ans: " البناء الجاهز تختلف معاييره من شركة إلى أخرى، فيوجد البناء باستخدام الخشب، و توجد ايضا الكرفانات التي تعتبر من البناء الجاهز، لكن في شركة هاوس ديزاين نعتمد كليا على الحديد الصلب ( الفولاذ ) في انشاء الوحدات السكنية و ذلك لغرض الوصول الى اعلى درجة من الصلابة و المتانة، اضافة الى استخدام المواد العازلة للصوت و الحرارة و الرطوبة و غيرها من المواد التي تكفل الحصول على رضا العميل في النهاية",
            },
            afterService: {
              ques: "الضمانات",
              ans1: "عند الانتهاء من أعمال البناء وتسليم المبني فإن شركة هاوس ديزاين تقدم الضمانات التالية :-",
              ans2: "- ضمان صيانة المنزل لمدة عام بعد الاستلام ",
              ans3: "- ضمان خمس سنوات علي السقفية",
              ans4: "- ضمان 25 سنة علي الهيكل الحديدي للمبني ",
            },
            nav: "التقييم",
            Contact: {
              departments: {
                dp1: "المدير العام",
                dp2: "قسم المبيعات",
                dp3: "القسم الهندسي",
                dp4: "البدالة",
              },
              guide: "اضغط للاتصال",
            },
            material: {
              steel: "الحديد البارد",
              dye: "الصبغة",
            },
            interaction: {
              Desc: {
                1: "التفاعلات",
                2: "مستوي رضي العميل",
                3: "الضمان",
              },
            },
          },

          Contact: {
            headLine: "تواصل بنا",
            1: "اسم المستخدم",
            2: "البريد الإلكتروني",
            3: "الرسالة",
            4: "إرسال",
          },
          Designs: {
            headLine: "تصميمات",
            subHeadLine: "تصميمات جرافيكية",
          },
        },
      },
    },
  });

export default i18n;
