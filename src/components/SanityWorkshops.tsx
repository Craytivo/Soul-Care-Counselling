
import YouTubeVideo from './YouTubeVideo';
import { getWorkshops } from '@/lib/sanity-queries';

export default async function SanityWorkshops() {
  const workshops = await getWorkshops();

  if (!workshops || workshops.length === 0) {
    return (
      <section className="mt-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-12">
            <p className="text-charcoal/60">No workshops found. Please check your Sanity configuration.</p>
          </div>
        </div>
      </section>
    );
  }

  // Only show recorded workshops
  const recordedWorkshops = workshops.filter((workshop: any) => workshop.isRecorded);

  return (
    <>
      {/* Workshop Recordings */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold mb-6">Workshop Recordings</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
          {recordedWorkshops.map((workshop: any) => (
            <article key={workshop._id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Video Preview */}
                <div className="p-6">
                  {workshop.videoUrl && (
                    <YouTubeVideo
                      videoId={workshop.videoUrl}
                      title={workshop.title}
                      className="w-full"
                    />
                  )}
                </div>

                {/* Workshop Details */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                        Recording
                      </span>
                      <span className="text-charcoal/60 text-sm">Free Access</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-3">{workshop.title}</h3>
                    <p className="text-charcoal/85 mb-4 text-sm leading-relaxed">{workshop.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center">
                      <span className="text-charcoal font-semibold text-xs">
                        {workshop.instructor.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{workshop.instructor}</p>
                      <p className="text-charcoal/60 text-xs">{workshop.instructorRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
