'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles, ChevronDown, ChevronUp, ZoomIn, X } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface ProcessStep {
  step: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  aspectClass?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'THE IDEA',
    image: '/assets/creative-process-1.jpg',
    alt: 'Sketchbook with butterfly anatomy and grid studies',
    description: 'The starting point a thought, question, feeling, or spark of inspiration.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    step: '02',
    title: 'EXPLORATION',
    image: '/assets/creative-process-2.jpg',
    alt: 'Three exploratory triptych ink studies of emerging butterfly forms',
    description: 'I experiment, research, and explore possibilities before deciding what the idea wants to become.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    step: '03',
    title: 'DISCOVERY',
    image: '/assets/creative-process-3.jpg',
    alt: 'Dense geometric and organic black-and-white linework discovery artwork',
    description: 'Through exploration, I discover the direction, visual language, and character that best express the idea.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    step: '04',
    title: 'EXPRESSION',
    image: '/assets/creative-process-4.jpg',
    alt: 'Final dynamic vertical ink expression artwork',
    description: 'The idea takes its final visual form shaped into something intentional, distinctive, and meaningful.',
    aspectClass: 'aspect-[3/4]',
  },
];

export const CreativeProcessSection: React.FC = () => {
  const [isArabicExpanded, setIsArabicExpanded] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string } | null>(null);

  const driveUrl = 'https://drive.google.com/drive/folders/1neMKXdVmsHxJscbjYXgZMYWWRH6lXaLE?hl=ar';

  return (
    <section id="about" className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 transition-colors duration-300">
      {/* 1. Header: Creative Process */}
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-2.5">
          <span className="w-8 h-0.5 bg-amber-flame" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-vibrant">
            Creative Process
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-(--text-primary) font-medium leading-tight">
          The Journey of the <span className="italic font-normal text-amber-vibrant">Butterfly</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-(--text-secondary) font-sans max-w-xl">
          From a thought... to a visual expression.
        </p>
      </div>

      {/* 2. Top 4 Process Cards (Matching reference layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 md:mb-12">
        {PROCESS_STEPS.map((item) => (
          <div
            key={item.step}
            className="flex flex-col group p-3.5 sm:p-4 rounded-2xl bg-(--bg-surface) border border-(--border-subtle) hover:border-amber-flame/50 transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            {/* Step header label */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-serif text-lg font-bold text-amber-vibrant tracking-tight">
                {item.step}
              </span>
              <span className="text-xs font-semibold tracking-[0.16em] uppercase text-(--text-primary)">
                {item.title}
              </span>
            </div>

            {/* Artwork thumbnail */}
            <div
              onClick={() => setActiveModalImage({ src: item.image, title: `${item.step} | ${item.title}` })}
              className={`relative w-full ${item.aspectClass || 'aspect-[4/3]'} rounded-xl overflow-hidden bg-black/40 border border-white/5 cursor-pointer group/img mb-3.5`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 duration-300">
                <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-xs">
                  <ZoomIn size={16} />
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-(--text-secondary) leading-relaxed mt-auto font-sans">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Card 05: The Butterfly - The Graduation Project */}
      <div className="relative rounded-3xl overflow-hidden border border-(--border-subtle) shadow-2xl bg-[#0a0410]">
        {/* Background artwork: back.png glowing purple/amber butterfly swirl */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/assets/graduation-bg.png"
            alt="Luminous Butterfly Wing Background"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-30 md:opacity-40"
          />
          {/* Deep dark gradient overlay for crystal clear typography */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0410]/90 via-[#0a0410]/80 to-[#0a0410]/95" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a0410]/50 to-[#0a0410]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12">
          {/* Header of Card 05 */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl md:text-3xl font-bold text-amber-vibrant">
                05
              </span>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/90">
                  THE BUTTERFLY
                </span>
                <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-amber-vibrant">
                  THE GRADUATION PROJECT
                </span>
              </div>
            </div>

            {/* Google Drive Link CTA */}
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-flame/60 text-xs font-medium text-white transition-all duration-200 group font-thmanyah"
            >
              <span>درايف المشروع (الملفات والبوستر)</span>
              <ExternalLink size={13} className="text-amber-vibrant group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Main 2-Column Grid: Text on Left, Poster on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Arabic Philosophical & Literary Narrative (7 cols) */}
            <div className="lg:col-span-7 flex flex-col order-2 lg:order-1 font-thmanyah" dir="rtl">
              {/* Titles */}
              <div className="mb-6">
                <h3 className="font-thmanyah-display text-4xl sm:text-5xl md:text-6xl text-amber-vibrant font-bold leading-tight tracking-normal">
                  أثرُ الفراشةِ لا يزول
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-(--text-secondary) mt-1.5" dir="ltr">
                  The Infinite Butterfly&apos;s Reminiscence
                </p>
              </div>

              {/* Philosophical Arabic Prose in Thmanyah Font */}
              <div className="space-y-4 text-base sm:text-[17px] text-gray-200 leading-[2.1] font-thmanyah font-normal">
                <p className="font-thmanyah-display text-2xl sm:text-3xl text-amber-glow font-medium leading-relaxed">
                  ويبقى الأثر ....
                </p>

                <p>
                  ماذا يحدث؟ لماذا الآن؟ هل هو من قبيلِ الصدفة يا تُرى؟ أم أنَّ كلَّ شيءٍ يحدث لسبب ما؟ هل تلك اللحظاتُ العابرةُ من الماضي لها ذلك التأثيرُ الهائلُ على المستقبل؟
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-amber-flame/30 text-amber-pale font-thmanyah text-lg sm:text-xl font-medium leading-[2.2]">
                  تقول الفيزياء لنا: (( أثرُ الفراشةِ لا يُرى ... أثر الفراشة لا يزول ... ))
                </div>

                <p>
                  إن اهتزازاتِ جناحِ فراشة بالغة الرقة في شرق الصين مثلاً يمكن أن يتسبب في حدوث إعصار هائل بعد زمن طويل في أمريكا الشمالية....
                </p>

                <p className="font-thmanyah-display text-xl text-white font-medium">
                  تنتهي الفراشة.. ولكن يبقى الأثر
                </p>

                <p>
                  هل نحن محاطون بفراشة تؤثر على حياتنا ... أم نحن الفراشات بذاتها يا ترى؟ تغيير بسيط جداً تكاد لا تدركه حتى يحدث لك تغير هائل في المستقبل. نظنه نظام فوضوي وعبثي ... لكنه نظام متسق في الوقت ذاته.
                </p>

                {/* Collapsible deeper contemplation */}
                {isArabicExpanded && (
                  <div className="space-y-4 pt-2 animate-fadeIn text-gray-300">
                    <p>
                      يحوطُنا الندم ونقول ربما لم يكن علينا فعل ذلك من البداية ... نريد العودة للماضي، نريد إحداث تغيير.
                    </p>
                    <p>
                      ولكن ماذا لو امتلكنا القدرة على التغيير، أي لحظة سنغير يا ترى؟ هل سنكتفي بالقليل من التغيير أم سنمحوها بالكامل؟
                    </p>
                    <p>
                      لديك الكثير من الاختيارات... والكثير من النتائج أيضاً لا تدري كيف سيكون أثر أي الاختيارات هذه في المستقبل، هل النتائج كانت ستصبح مختلفة للأفضل أم للأسوء ؟ هل ستصبح مختلفة من الأساس؟
                    </p>
                    <p>
                      أم أن كل ذلك دون جدوى وهناك آثار أخرى تؤثر علينا. ندور في حلقات متصلة، محتمل أن اختيارات أناس آخرين تتداخل مع اختياراتنا لنصل إلى نفس النتيجة في نهاية الأمر.
                    </p>
                    <p>
                      هناك لحظات ألوم الفراشات ... هي من تسببت في كل ذلك فلم يكن بيدي حيلةٌ فيما يحدث. ولحظات أخرى أدرك أنني الفراشة.
                    </p>
                    <div className="p-4 rounded-lg bg-amber-flame/10 border-r-2 border-amber-flame text-amber-pale font-thmanyah text-lg">
                      <p>كل اهتزازة لجناح الفراشة ... كانت اختيارًا</p>
                      <p>كل إعصار بداخلي ... كان سببه اختيار</p>
                    </div>
                    <p>
                      يصعب إدراك شيء بتلك الخفة وتلك السيادة ... الجمال والوحشية في الوقت ذاته.
                    </p>
                    <p>
                      نحب الفراشات دون إدراك أثرها ..... نرى كل شيء يدور حول الماضي والمستقبل ... لكن ماذا عن الحاضر ؟
                    </p>
                    <p>
                      ماذا يحدث؟ لماذا الآن؟ هل هو من قبيل الصدفة يا ترى؟ أم أن كل شيء يحدث لسبب ما؟
                    </p>
                    <p className="font-thmanyah-display text-xl text-white font-medium">
                      هل الحاضر رهينة للماضي أم هو الوسيلة لتغيير المستقبل؟
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setIsArabicExpanded(!isArabicExpanded)}
                  className="inline-flex items-center gap-1.5 pt-1 text-sm sm:text-base font-thmanyah font-medium text-amber-vibrant hover:text-amber-glow transition-colors cursor-pointer"
                >
                  <span>{isArabicExpanded ? 'طيّ النص' : 'اقرأ النص كاملاً'}</span>
                  {isArabicExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Action Jump to Exhibition Wall */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4" dir="ltr">
                <a
                  href="#graduation-wall"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-amber-vibrant hover:text-white transition-colors"
                >
                  <span>Explore The 8 Museum Plates</span>
                  <span>↓</span>
                </a>
              </div>
            </div>

            {/* Right Column: Graduation Poster (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
              <TiltCard3D maxTilt={6} glareOpacity={0.2} scale={1.02}>
                <div
                  onClick={() => setActiveModalImage({ src: '/assets/graduation-poster.jpg', title: 'بوستر مشروع التخرج — أثر الفراشة لا يزول' })}
                  className="relative rounded-2xl overflow-hidden bg-black/60 border-2 border-white/15 hover:border-amber-flame/80 transition-all duration-300 shadow-2xl group cursor-pointer max-w-[340px] sm:max-w-[380px]"
                >
                  <Image
                    src="/assets/graduation-poster.jpg"
                    alt="بوستر مشروع التخرج: أثر الفراشة لا يزول — جامعة المنصورة، كلية الفنون الجميلة، 2024"
                    width={1000}
                    height={1500}
                    priority
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-103"
                  />

                  {/* Corner Zoom badge */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1 border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity font-thmanyah">
                    <ZoomIn size={12} className="text-amber-vibrant" />
                    <span>تكبير البوستر</span>
                  </div>

                  {/* Bottom overlay caption */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent text-center font-thmanyah">
                    <span className="text-[10px] tracking-widest uppercase font-mono text-amber-vibrant font-sans">
                      OFFICIAL EXHIBITION POSTER
                    </span>
                    <p className="text-xs text-white/90 mt-0.5">
                      جامعة المنصورة • كلية الفنون الجميلة • 2024
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </div>

        {/* 4. Under Card 05: Metadata strip styled exactly like Marwa's portrait metadata */}
        <div className="relative z-10 bg-[#07020d]/90 backdrop-blur-md border-t border-white/10 px-6 sm:px-8 md:px-12 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-[11px] text-gray-300">
            <div>
              <span className="font-semibold text-amber-vibrant uppercase tracking-wider text-[10px] block mb-0.5">
                Plates Structure:
              </span>
              <span className="text-gray-300 leading-normal">
                Eight printmaking plates: Four plates of Intaglio &amp; others by lithograph.
              </span>
            </div>
            <div>
              <span className="font-semibold text-amber-vibrant uppercase tracking-wider text-[10px] block mb-0.5">
                Display Scale:
              </span>
              <span className="text-gray-300 leading-normal">
                The total display area of the project was approximately 7 meters.
              </span>
            </div>
            <div>
              <span className="font-semibold text-amber-vibrant uppercase tracking-wider text-[10px] block mb-0.5">
                Execution Technique:
              </span>
              <span className="text-gray-300 leading-normal">
                The work was primarily done in Specialized printmaking techniques.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox for Image Inspection */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center bg-[#12071d] rounded-2xl border border-white/20 p-2 sm:p-4 shadow-2xl"
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute -top-3 -right-3 sm:top-3 sm:right-3 z-10 p-2 rounded-full bg-black/80 hover:bg-amber-flame text-white border border-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={activeModalImage.src}
                alt={activeModalImage.title}
                width={1200}
                height={1600}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm text-(--text-secondary) font-sans text-center">
              {activeModalImage.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
