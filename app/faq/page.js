'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch, FaQuestionCircle, FaShippingFast, FaShieldAlt, FaGem, FaHeart, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: 'collections',
      title: 'Our Collections',
      icon: FaGem,
      color: '#008080',
      questions: [
        {
          id: 'collections-overview',
          question: 'What collections does Varam Silvers offer?',
          answer: 'We offer five distinct collections: Earrings (9 designs), Bracelets (4 designs), Kada (9 designs), Nazariya (3 designs), and Chains (7 designs). Each collection features unique designs crafted with 92.5 Sterling Silver, available in Silver, Gold, and Rose Gold variants.'
        },
        {
          id: 'chains-collection',
          question: 'Tell me about your Chains collection',
          answer: 'Our Chains collection features 7 beautiful designs including Butterfly Feet Chain, Eye Chain, Panda Chain, Tiger Chain, Unicorn Chain, Yellow Car Chain, and White Flower Chain. Each chain is designed for children aged 2-16 years with adjustable sizing and weights ranging from 2-5 grams.'
        },
        {
          id: 'earrings-collection',
          question: 'What earrings do you offer?',
          answer: 'Our Earrings collection includes 9 designs: Flower Earrings, House Sparrow Earrings, Butterfly Earrings, Rose Flower Earrings, Silver Elephant Earrings, Silver Eye Earrings, Silver Moon Earrings, Silver Zebra Earrings, and White Elephant Earrings. All earrings are hypoallergenic and safe for sensitive skin.'
        },
        {
          id: 'bracelets-collection',
          question: 'What bracelets are available?',
          answer: 'Our Bracelet collection features 4 designs: House Sparrow Bracelet, Silver Flower Bracelet, Yellow Elephant Bracelet, and Unicorn Bracelet. Each bracelet is adjustable and weighs between 1-8 grams, perfect for growing children.'
        },
        {
          id: 'kada-collection',
          question: 'What is your Kada collection?',
          answer: 'Our Kada collection includes 9 traditional designs: Minimal Elephant Kada, Singaa Kuty Kada, Aladdin Galaxy Star Kada, Cup Cake Kada, Kid Giraffe Kada, Pinky Flower Candy Pineapple Kada, Protection Evil Eye Kada, Tiger Kada, and Unicorn Elephant Kada. Each kada weighs 6-9 grams and represents cultural significance.'
        },
        {
          id: 'nazariya-collection',
          question: 'What is the Nazariya collection?',
          answer: 'Our Nazariya collection features 3 elegant designs: Butterfly Evil Eye Nazariya, Baby Feet Nazariya, and Lion Nazariya. These lightweight pieces (2-3 grams) are perfect for special occasions and carry protective symbolism.'
        }
      ]
    },
    {
      id: 'general',
      title: 'General Questions',
      icon: FaQuestionCircle,
      color: '#20b2aa',
      questions: [
        {
          id: 'what-is-sterling-silver',
          question: 'What is 92.5 Sterling Silver?',
          answer: '92.5 Sterling Silver is a high-quality silver alloy containing 92.5% pure silver and 7.5% other metals (usually copper). This composition makes it durable, hypoallergenic, and perfect for children\'s jewelry. It\'s the international standard for fine silver jewelry.'
        },
        {
          id: 'age-appropriate',
          question: 'What age range is your jewelry suitable for?',
          answer: 'Our jewelry is designed for children aged 2-16 years. Each piece is carefully crafted with safety in mind, featuring smooth edges, secure clasps, and adjustable sizing to grow with your child.'
        },
        {
          id: 'hypoallergenic',
          question: 'Is your jewelry hypoallergenic?',
          answer: 'Yes! Our 92.5 Sterling Silver jewelry is hypoallergenic and safe for sensitive skin. The high silver content and quality materials ensure that even children with sensitive skin can wear our jewelry comfortably.'
        },
        {
          id: 'customization',
          question: 'Do you offer customization services?',
          answer: 'Yes, we offer personalized engraving services for most of our jewelry pieces. You can add your child\'s name, birthdate, or a special message. Customization options are available at checkout.'
        },
        {
          id: 'founder-story',
          question: 'Who founded Varam Silvers?',
          answer: 'Varam Silvers was founded in 2025 by Praveen, a passionate entrepreneur and craftsman. Praveen\'s vision was to create beautiful, safe, and meaningful silver jewelry that celebrates the precious moments of childhood while maintaining the highest standards of quality and safety.'
        }
      ]
    },
    {
      id: 'care',
      title: 'Care & Maintenance',
      icon: FaGem,
      color: '#006666',
      questions: [
        {
          id: 'cleaning',
          question: 'How do I clean and maintain silver jewelry?',
          answer: 'Clean your silver jewelry with a soft cloth and mild soap. Avoid harsh chemicals and store in a dry place. For tarnished pieces, use a silver polishing cloth. Regular gentle cleaning will keep your jewelry looking beautiful for years.'
        },
        {
          id: 'tarnishing',
          question: 'Why does silver tarnish and how can I prevent it?',
          answer: 'Silver tarnishes due to exposure to air, moisture, and certain chemicals. To prevent tarnishing, store jewelry in airtight bags or boxes, avoid contact with perfumes and lotions, and clean regularly with a soft cloth.'
        },
        {
          id: 'storage',
          question: 'What\'s the best way to store silver jewelry?',
          answer: 'Store each piece separately in soft pouches or jewelry boxes with anti-tarnish strips. Keep away from direct sunlight and humidity. Avoid storing multiple pieces together to prevent scratching.'
        },
        {
          id: 'wearing-guidelines',
          question: 'When should children not wear silver jewelry?',
          answer: 'Remove jewelry during swimming, sports activities, bathing, and sleep. Avoid wearing during activities that might cause impact or pulling. Always supervise young children when wearing jewelry.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: FaShippingFast,
      color: '#006666',
      questions: [
        {
          id: 'shipping-time',
          question: 'How long does shipping take?',
          answer: 'We offer free shipping within India with delivery times of 5-7 business days. International shipping is available at additional cost with delivery times of 10-15 business days. Express shipping options are available for faster delivery.'
        },
        {
          id: 'shipping-cost',
          question: 'What are your shipping costs?',
          answer: 'We provide free shipping on all orders within India. No minimum order value required. International shipping is available at additional cost. Express shipping is available for an additional fee if you need faster delivery.'
        },
        {
          id: 'tracking',
          question: 'Can I track my order?',
          answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can track your package in real-time through our website or the shipping carrier\'s website.'
        },
        {
          id: 'international',
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship internationally to select countries. International orders may be subject to customs duties and taxes, which are the responsibility of the customer. Please contact us for international shipping rates.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Replacements',
      icon: FaShieldAlt,
      color: '#008080',
      questions: [
        {
          id: 'return-policy',
          question: 'What is your 7-day replacement and refund policy?',
          answer: 'We offer a 7-day replacement and refund policy for damaged, defective, or wrong items. An unboxing video is mandatory for all claims. The video must show the complete unboxing process from package opening to item reveal. This helps us ensure authenticity and process your request efficiently.'
        },
        {
          id: 'exchange-process',
          question: 'How do I request a size or style exchange?',
          answer: 'For size or style exchanges, contact us within 7 days with your unboxing video. We\'ll provide shipping instructions for returning the original item. Once received, we\'ll ship your new item within 3-5 business days. Size exchanges are free, but style exchanges may have price differences.'
        },
        {
          id: 'defective-items',
          question: 'What if I receive a damaged or defective item?',
          answer: 'We apologize for any inconvenience. Contact us immediately within 7 days with your unboxing video showing the damage. We\'ll arrange for a free replacement or full refund, and we\'ll cover all return shipping costs. This applies to items damaged during shipping or manufacturing defects.'
        },
        {
          id: 'refund-policy',
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer refunds for damaged or defective items within 7 days of delivery. An unboxing video is mandatory for all refund requests to document the condition of the item upon arrival. Refunds will be processed within 3-5 business days after we receive the returned item.'
        },
        {
          id: 'unboxing-video-requirement',
          question: 'Why is an unboxing video required?',
          answer: 'An unboxing video is mandatory for all exchange, damage claims, and refund requests to ensure authenticity and help us maintain our quality standards. The video should show the complete unboxing process from package opening to item reveal, clearly documenting the condition of the item upon arrival.'
        }
      ]
    },
    {
      id: 'sizing',
      title: 'Sizing & Fit',
      icon: FaHeart,
      color: '#20b2aa',
      questions: [
        {
          id: 'size-guide',
          question: 'Do you have a size guide?',
          answer: 'Yes! We provide detailed size guides for each category of jewelry. Our bracelets and anklets are adjustable, while necklaces come in various lengths. Check the product page for specific sizing information.'
        },
        {
          id: 'adjustable-pieces',
          question: 'Which pieces are adjustable?',
          answer: 'Most of our bracelets and anklets feature adjustable clasps that can grow with your child. Necklaces come in different lengths, and some pieces have extension chains for added flexibility.'
        },
        {
          id: 'measuring',
          question: 'How do I measure my child for jewelry?',
          answer: 'Use a soft measuring tape to measure around the wrist, ankle, or neck. Add 0.5-1 inch for comfort. Our size guide provides specific measurements for each age range and jewelry type.'
        },
        {
          id: 'wrong-size',
          question: 'What if I order the wrong size?',
          answer: 'No worries! We offer free size exchanges within 7 days of delivery with an unboxing video. Contact our customer service team with your unboxing video, and we\'ll help you find the perfect fit for your child.'
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact & Support',
      icon: FaPhone,
      color: '#006666',
      questions: [
        {
          id: 'contact-methods',
          question: 'How can I contact customer support?',
          answer: 'You can reach us via WhatsApp at +91 94448 85666, email at varamsilvers@gmail.com, or through our contact form. We typically respond within 2-4 hours during business hours (10 AM - 8 PM, Monday-Saturday).'
        },
        {
          id: 'business-hours',
          question: 'What are your business hours?',
          answer: 'Our customer support is available Monday-Saturday from 10:00 AM to 8:00 PM and Sunday from 11:00 AM to 6:00 PM (IST). We respond to emails and messages outside these hours as soon as possible.'
        },
        {
          id: 'response-time',
          question: 'How quickly do you respond to inquiries?',
          answer: 'We aim to respond to all inquiries within 2-4 hours during business hours. For urgent matters, WhatsApp is the fastest way to reach us. We\'re committed to providing excellent customer service.'
        },
        {
          id: 'bulk-orders',
          question: 'Do you handle bulk or wholesale orders?',
          answer: 'Yes, we welcome bulk orders for special occasions like weddings, birthdays, or retail partnerships. Contact us directly for custom pricing and delivery arrangements for orders over 10 pieces.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <main className="faq-page">
      <div className="faq-container">
        {/* Hero Section */}
        <motion.div
          className="faq-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Find answers to common questions about our silver jewelry, care instructions, shipping, and more.
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="faq-content">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              className="faq-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="category-header">
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  <category.icon />
                </div>
                <h2 className="category-title">{category.title}</h2>
              </div>
              
              <div className="questions-container">
                {category.questions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="faq-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleItem(item.id)}
                    >
                      <span className="question-text">{item.question}</span>
                      <motion.div
                        className="chevron"
                        animate={{ rotate: openItems[item.id] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openItems[item.id] && (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="answer-content">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="cta-content">
            <h3>Still have questions?</h3>
            <p>Our customer support team is here to help you find the perfect jewelry for your little one.</p>
            <div className="cta-buttons">
              <a href="https://wa.me/919444885666?text=Hello! I have a question about Varam Silvers jewelry." 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="cta-btn whatsapp-btn">
                <FaPhone />
                WhatsApp Us
              </a>
              <a href="mailto:varamsilvers@gmail.com?subject=Question about Varam Silvers" 
                 className="cta-btn email-btn">
                <FaEnvelope />
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .faq-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 0;
        }

        .faq-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .faq-hero {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-title {
          font-size: 3rem;
          font-weight: 700;
          color: #008080;
          margin-bottom: 1rem;
          font-family: var(--font-playfair);
        }

        .faq-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .search-container {
          position: relative;
          max-width: 500px;
          margin: 0 auto;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #008080;
          font-size: 1.1rem;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e0f7f7;
          border-radius: 12px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 128, 128, 0.1);
        }

        .search-input:focus {
          outline: none;
          border-color: #008080;
          box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
        }

        .faq-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .faq-category {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 128, 128, 0.1);
          border: 1px solid #e0f7f7;
          overflow: hidden;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid #e0f7f7;
        }

        .category-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .category-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .questions-container {
          padding: 0;
        }

        .faq-item {
          border-bottom: 1px solid #e0f7f7;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          width: 100%;
          padding: 1.5rem 2rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1f2937;
        }

        .faq-question:hover {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .question-text {
          flex: 1;
          margin-right: 1rem;
        }

        .chevron {
          color: #008080;
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .faq-answer {
          overflow: hidden;
        }

        .answer-content {
          padding: 0 2rem 1.5rem 2rem;
          color: #6b7280;
          line-height: 1.7;
          font-size: 1rem;
        }

        .contact-cta {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 128, 128, 0.1);
          border: 1px solid #e0f7f7;
          padding: 2rem;
          text-align: center;
        }

        .cta-content h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #008080;
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: #6b7280;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 128, 128, 0.3);
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
        }

        .whatsapp-btn:hover {
          background: linear-gradient(135deg, #128c7e 0%, #0d6b5f 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          color: white;
          text-decoration: none;
        }

        .email-btn {
          background: linear-gradient(135deg, #008080 0%, #20b2aa 100%);
          color: white;
        }

        .email-btn:hover {
          background: linear-gradient(135deg, #006666 0%, #008080 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 128, 128, 0.4);
          color: white;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .faq-title {
            font-size: 2.5rem;
          }

          .faq-subtitle {
            font-size: 1.1rem;
          }

          .category-header {
            padding: 1rem 1.5rem;
          }

          .category-title {
            font-size: 1.3rem;
          }

          .faq-question {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }

          .answer-content {
            padding: 0 1.5rem 1rem 1.5rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}
