using Database;
using Database.Models;

namespace Backend
{
    public static class SeedData
    {
        public static void Initialize(CoreDbContext context)
        {
            // Only seed if database is empty
            if (context.Products.Any()) return;

            var now = DateTime.UtcNow;

            // Categories already seeded by migration:
            // 1 = phones, 2 = macbooks, 3 = accessories

            // -------------------------
            // SPECS
            // -------------------------
            var specSilver = new Spec { Name = "Silver" };
            var specCosmicOrange = new Spec { Name = "Cosmic Orange" };
            var specDeepBlue = new Spec { Name = "Deep Blue" };
            var specLavender = new Spec { Name = "Lavender" };
            var specMistBlue = new Spec { Name = "Mist Blue" };
            var specSage = new Spec { Name = "Sage" };
            var specBlack = new Spec { Name = "Black" };
            var specWhite = new Spec { Name = "White" };
            var specMidnight = new Spec { Name = "Midnight" };
            var specStarlight = new Spec { Name = "Starlight" };
            var specSkyBlue = new Spec { Name = "Sky Blue" };
            var specSpaceBlack = new Spec { Name = "Space Black" };
            var specGraphite = new Spec { Name = "Graphite" };
            var specElectricOrange = new Spec { Name = "Electric Orange" };
            var specClear = new Spec { Name = "Clear" };
            var spec128gb = new Spec { Name = "128gb" };
            var spec256gb = new Spec { Name = "256gb" };
            var spec512gb = new Spec { Name = "512gb" };
            var spec1tb = new Spec { Name = "1tb" };
            var specA19Pro = new Spec { Name = "A19Pro" };
            var specA19 = new Spec { Name = "A19" };
            var specA18 = new Spec { Name = "A18" };
            var spec16gb = new Spec { Name = "16gb" };
            var spec24gb = new Spec { Name = "24gb" };
            var spec48gb = new Spec { Name = "48gb" };
            var spec13inch = new Spec { Name = "13-inch" };
            var spec14inch = new Spec { Name = "14-inch" };
            var spec15inch = new Spec { Name = "15-inch" };
            var spec16inch = new Spec { Name = "16-inch" };
            var spec1m = new Spec { Name = "1m" };
            var spec2m = new Spec { Name = "2m" };
            var spec45mm = new Spec { Name = "45mm" };
            var specBlush = new Spec { Name = "Blush" };
            var specCitrus = new Spec { Name = "Citrus" };
            var specIndigo = new Spec { Name = "Indigo" };
            var specCloudWhite = new Spec { Name = "Cloud White" };
            var specLightGold = new Spec { Name = "Light Gold" };
            var specA18Pro = new Spec { Name = "A18Pro" };
            var spec8gb = new Spec { Name = "8gb" };

            context.Specs.AddRange(
                specSilver, specCosmicOrange, specDeepBlue, specLavender, specMistBlue,
                specSage, specBlack, specWhite, specMidnight, specStarlight, specSkyBlue,
                specSpaceBlack, specGraphite, specElectricOrange, specClear,
                spec128gb, spec256gb, spec512gb, spec1tb,
                specA19Pro, specA19, specA18,
                spec16gb, spec24gb, spec48gb,
                spec13inch, spec14inch, spec15inch, spec16inch,
                spec1m, spec2m, spec45mm,
                specBlush, specCitrus, specIndigo,
                specCloudWhite, specLightGold,
                specA18Pro, spec8gb
            );
            context.SaveChanges();

            // -------------------------
            // PRODUCTS
            // -------------------------
            var products = new List<(Product product, List<Spec> specs)>
            {
                // #1 iPhone 17 Pro Silver 256gb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990929.apple-iphone-17-pro-256gb.jpg", Price = 504890, Description = "The iPhone 17 Pro features a stunning aerospace-grade aluminum unibody design in a refined Silver finish, powered by the A19 Pro chip for Apple's best-ever performance.\n\nThe 6.3-inch Super Retina XDR display delivers up to 3,000 nits of outdoor brightness with ProMotion 120Hz technology.\n\nThree 48MP Fusion cameras offer the equivalent of eight pro lenses with 8× optical-quality zoom, while the 18MP Center Stage front camera elevates every selfie and video call.\n\nWith up to 33 hours of video playback and fast charging to 50% in just 20 minutes, the iPhone 17 Pro keeps up with your day — and beyond.\n\n256GB of storage. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 58, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec256gb, specA19Pro }),

                // #3 iPhone 17 Pro Cosmic Orange 256gb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990959.apple-iphone-17-pro-256gb.jpg", Price = 504890, Description = "The iPhone 17 Pro in Cosmic Orange is the boldest iPhone Apple has ever made — a striking, deep orange finish on the heat-forged aluminum unibody that turns heads in any light.\n\nThe A19 Pro chip delivers Apple's best-ever performance, powering a 6.3-inch Super Retina XDR display at up to 3,000 nits with ProMotion 120Hz.\n\nThree 48MP Fusion cameras with 8× optical-quality zoom capture professional-quality photos and video, while the 18MP Center Stage front camera keeps every call looking sharp.\n\nUp to 33 hours of video playback, fast charge to 50% in 20 minutes. 256GB of storage. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 45, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCosmicOrange, spec256gb, specA19Pro }),

                // #4 iPhone 17 Pro Deep Blue 256gb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990947.apple-iphone-17-pro-256gb.jpg", Price = 504890, Description = "Deep Blue gives the iPhone 17 Pro a sleek, dark presence that shifts between near-black and rich blue depending on the light.\n\nBuilt with a heat-forged aluminum unibody and powered by the A19 Pro chip, it delivers Apple's most powerful performance in a refined package.\n\nThe 6.3-inch Super Retina XDR display reaches 3,000 nits outdoors with ProMotion 120Hz smoothness. Three 48MP cameras with 8× zoom and an 18MP Center Stage front camera complete a world-class imaging system.\n\nUp to 33 hours of video playback and fast charging to 50% in 20 minutes. 256GB of storage. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 37, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specDeepBlue, spec256gb, specA19Pro }),

                // #5 iPhone 17 Pro Silver 512gb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990929.apple-iphone-17-pro-256gb.jpg", Price = 579890, Description = "All the brilliance of iPhone 17 Pro, now with 512GB of storage for your entire creative library.\n\nThe A19 Pro chip drives the 6.3-inch Super Retina XDR display at up to 3,000 nits with ProMotion 120Hz. Three 48MP Fusion cameras offer 8× optical-quality zoom and professional video recording, while the 18MP Center Stage front camera shines in every selfie.\n\nUp to 33 hours of video playback and fast charge to 50% in 20 minutes. Silver finish. iOS 26. Ready for anything.", Discount = 5, StorageQuantity = 33, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, specA19Pro }),

                // #6 iPhone 17 Pro Cosmic Orange 512gb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990959.apple-iphone-17-pro-256gb.jpg", Price = 579890, Description = "iPhone 17 Pro in Cosmic Orange with 512GB — maximum storage, maximum impact.\n\nThe A19 Pro chip powers the 6.3-inch Super Retina XDR display at 3,000 nits with ProMotion 120Hz. Three 48MP cameras with 8× optical-quality zoom and an 18MP Center Stage front camera give you a professional studio in your pocket.\n\nUp to 33 hours of video playback and fast charge to 50% in 20 minutes. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 28, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCosmicOrange, spec512gb, specA19Pro }),

                // #7 iPhone 17 Pro Deep Blue 512gb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990947.apple-iphone-17-pro-256gb.jpg", Price = 579890, Description = "Deep Blue meets 512GB of storage — the perfect combination of bold aesthetics and serious capacity.\n\nThe iPhone 17 Pro's A19 Pro chip handles every task with ease, driving a 6.3-inch Super Retina XDR display at 3,000 nits and ProMotion 120Hz. Three 48MP cameras with 8× zoom, an 18MP Center Stage front camera, and up to 33 hours of video playback round out the package.\n\nFast charge to 50% in 20 minutes. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 24, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specDeepBlue, spec512gb, specA19Pro }),

                // #8 iPhone 17 Pro Silver 1tb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990929.apple-iphone-17-pro-256gb.jpg", Price = 654890, Description = "For creators who never compromise. The iPhone 17 Pro in Silver with 1TB lets you shoot, store, and share without limits.\n\nThe A19 Pro chip handles the most demanding workflows with ease, while the 6.3-inch Super Retina XDR display delivers up to 3,000 nits and ProMotion 120Hz.\n\nThree 48MP Fusion cameras with 8× optical-quality zoom give you a professional studio in your pocket, and the 18MP Center Stage front camera is always ready.\n\nUp to 33 hours of video playback and fast charging to 50% in 20 minutes. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 19, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, specA19Pro }),

                // #9 iPhone 17 Pro Cosmic Orange 1tb
                (new Product { Name = "iPhone 17 Pro", ImageUrl = "https://p1.akcdn.net/gallery/1236918166/full/2990959.apple-iphone-17-pro-256gb.jpg", Price = 654890, Description = "The ultimate statement in storage and style. iPhone 17 Pro in Cosmic Orange with 1TB is built for professionals who demand everything.\n\nThe A19 Pro chip powers a 6.3-inch Super Retina XDR display at 3,000 nits with ProMotion 120Hz. Three 48MP cameras with 8× optical-quality zoom, an 18MP Center Stage front camera, and up to 33 hours of video playback.\n\nFast charge to 50% in 20 minutes. iOS 26. Ready for anything.", Discount = 0, StorageQuantity = 12, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCosmicOrange, spec1tb, specA19Pro }),

                // #10 iPhone 17 Pro Max Silver 256gb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991241.apple-iphone-17-pro-max-256gb.jpg", Price = 619890, Description = "The biggest, most powerful iPhone ever made. The iPhone 17 Pro Max in Silver features a massive 6.9-inch Super Retina XDR display reaching 3,000 nits outdoors with ProMotion 120Hz.\n\nThe A19 Pro chip sets a new benchmark for smartphone performance, powering a triple 48MP camera system with 8× optical-quality zoom and 4K ProRes video. The 18MP Center Stage front camera brings cinematic quality to every selfie.\n\nUp to 39 hours of video playback and fast charging to 50% in just 20 minutes. 256GB of storage. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 44, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec256gb, specA19Pro }),

                // #11 iPhone 17 Pro Max Cosmic Orange 256gb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991259.apple-iphone-17-pro-max-256gb.jpg", Price = 619890, Description = "The iPhone 17 Pro Max in Cosmic Orange commands attention on the largest canvas Apple has ever made.\n\nThe A19 Pro chip powers a 6.9-inch Super Retina XDR display at 3,000 nits with ProMotion 120Hz. Three 48MP cameras with 8× zoom and ProRes video capture the world in stunning detail, while the 18MP Center Stage front camera ensures every video call is crystal clear.\n\nUp to 39 hours of video playback. 256GB of storage. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 39, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCosmicOrange, spec256gb, specA19Pro }),

                // #12 iPhone 17 Pro Max Deep Blue 256gb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991229.apple-iphone-17-pro-max-256gb.jpg", Price = 619890, Description = "Deep Blue on the largest iPhone screen Apple has ever made. The iPhone 17 Pro Max brings a 6.9-inch Super Retina XDR display with 3,000 nits and ProMotion 120Hz, powered by the A19 Pro chip.\n\nThree 48MP cameras offer unmatched photographic flexibility with 8× optical-quality zoom and professional ProRes video. The 18MP Center Stage front camera elevates video calls to a new level.\n\nUp to 39 hours of video playback and fast charging to 50% in 20 minutes. 256GB of storage. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 31, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specDeepBlue, spec256gb, specA19Pro }),

                // #13 iPhone 17 Pro Max Silver 512gb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991241.apple-iphone-17-pro-max-256gb.jpg", Price = 694890, Description = "The iPhone 17 Pro Max in Silver with 512GB gives you the space to capture every moment in full ProRes quality.\n\nThe 6.9-inch Super Retina XDR display with ProMotion 120Hz and 3,000 nits peak brightness is perfect for editing on the go. The A19 Pro chip ensures every task — from rendering to gaming — feels instant.\n\nTriple 48MP cameras, 8× zoom, and an 18MP Center Stage front camera make this the definitive photography powerhouse. Up to 39 hours of video playback. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 22, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, specA19Pro }),

                // #14 iPhone 17 Pro Max Cosmic Orange 512gb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991259.apple-iphone-17-pro-max-256gb.jpg", Price = 694890, Description = "Maximum screen, maximum storage, maximum personality. The iPhone 17 Pro Max in Cosmic Orange with 512GB is built for power users who want it all.\n\nA 6.9-inch Super Retina XDR display with 3,000 nits and ProMotion 120Hz looks stunning from every angle. The A19 Pro chip, triple 48MP cameras with 8× zoom, and 18MP Center Stage front camera make every experience exceptional.\n\nUp to 39 hours of video playback and fast charge to 50% in 20 minutes. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 17, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCosmicOrange, spec512gb, specA19Pro }),

                // #15 iPhone 17 Pro Max Deep Blue 512gb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991229.apple-iphone-17-pro-max-256gb.jpg", Price = 694890, Description = "iPhone 17 Pro Max in Deep Blue with 512GB — a dark, sleek powerhouse with room for everything.\n\nThe 6.9-inch Super Retina XDR display with 3,000 nits and ProMotion 120Hz is breathtaking. The A19 Pro chip, triple 48MP cameras, 8× zoom, and 18MP Center Stage front camera complete an unbeatable package.\n\nUp to 39 hours of video playback and fast charge to 50% in 20 minutes. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 14, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specDeepBlue, spec512gb, specA19Pro }),

                // #16 iPhone 17 Pro Max Silver 1tb
                (new Product { Name = "iPhone 17 Pro Max", ImageUrl = "https://p1.akcdn.net/gallery/1236918178/full/2991241.apple-iphone-17-pro-max-256gb.jpg", Price = 769890, Description = "For the creator who refuses to run out of space. iPhone 17 Pro Max in Silver with 1TB gives you the freedom to shoot, store, and create without ever deleting a thing.\n\nThe 6.9-inch Super Retina XDR display with 3,000 nits and ProMotion 120Hz is the ideal canvas for your work. The A19 Pro chip, triple 48MP cameras, 8× zoom, ProRes video, and 18MP Center Stage front camera complete an unbeatable package.\n\nUp to 39 hours of video playback. iOS 26. The ultimate iPhone.", Discount = 0, StorageQuantity = 11, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, specA19Pro }),

                // #17 iPhone 17 Lavender 128gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/3013741.apple-iphone-17-256gb.jpg", Price = 379890, Description = "The iPhone 17 in Lavender is a beautiful expression of calm and style.\n\nThe A19 chip powers a 6.3-inch Super Retina XDR display with 3,000 nits of peak outdoor brightness and ProMotion 120Hz. The 48MP Dual Fusion camera system captures stunning photos and 4K video, while the new 18MP Center Stage front camera keeps everyone in frame.\n\nUp to 26 hours of video playback and fast charging to 50% in 20 minutes. 128GB of storage. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 67, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specLavender, spec128gb, specA19 }),

                // #18 iPhone 17 Mist Blue 128gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991169.apple-iphone-17-256gb.jpg", Price = 379890, Description = "iPhone 17 in Mist Blue — a cool, airy finish that feels modern and effortless.\n\nThe A19 chip powers a 6.3-inch Super Retina XDR display with 3,000 nits peak brightness and ProMotion 120Hz, while the 48MP Dual Fusion camera captures life in beautiful detail. The 18MP Center Stage front camera automatically keeps you in frame during video calls.\n\nUp to 26 hours of video playback and fast charging to 50% in 20 minutes. 128GB. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 72, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMistBlue, spec128gb, specA19 }),

                // #19 iPhone 17 Sage 128gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991145.apple-iphone-17-256gb.jpg", Price = 379890, Description = "iPhone 17 in Sage — a soft, earthy green that pairs perfectly with nature and everyday life.\n\nThe A19 chip drives a 6.3-inch Super Retina XDR display with 3,000 nits of peak brightness and ProMotion 120Hz. The 48MP Dual Fusion camera captures impressive detail in any light, and the 18MP Center Stage front camera ensures you always look your best on video calls.\n\nUp to 26 hours of video playback, fast charge to 50% in 20 minutes. 128GB. iOS 26. Do more with iPhone.", Discount = 10, StorageQuantity = 81, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSage, spec128gb, specA19 }),

                // #20 iPhone 17 Black 128gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991157.apple-iphone-17-256gb.jpg", Price = 379890, Description = "Timeless and bold. iPhone 17 in Black pairs a sleek, understated design with the powerful A19 chip.\n\nThe 6.3-inch Super Retina XDR display delivers stunning visuals at 3,000 nits peak brightness with ProMotion 120Hz, and the 48MP Dual Fusion camera makes every shot count. The 18MP Center Stage front camera keeps video calls sharp and centered.\n\nUp to 26 hours of video playback and fast charging to 50% in 20 minutes. 128GB. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 88, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specBlack, spec128gb, specA19 }),

                // #21 iPhone 17 White 128gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991133.apple-iphone-17-256gb.jpg", Price = 379890, Description = "Clean, classic, and capable. iPhone 17 in White features the A19 chip powering a 6.3-inch Super Retina XDR display with 3,000 nits peak outdoor brightness and ProMotion 120Hz.\n\nThe 48MP Dual Fusion camera delivers beautiful photos and 4K video, while the 18MP Center Stage front camera automatically frames you perfectly.\n\nUp to 26 hours of video playback and fast charging to 50% in 20 minutes. 128GB. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 76, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec128gb, specA19 }),

                // #22 iPhone 17 Lavender 256gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/3013741.apple-iphone-17-256gb.jpg", Price = 449890, Description = "More storage, same beautiful Lavender finish. iPhone 17 with 256GB and the A19 chip gives you plenty of room for your photos, videos, and apps.\n\nThe 6.3-inch Super Retina XDR display with 3,000 nits peak brightness and ProMotion 120Hz looks gorgeous indoors and out. The 48MP Dual Fusion camera and 18MP Center Stage front camera ensure every photo and call is exceptional.\n\nUp to 26 hours of video playback. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 54, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specLavender, spec256gb, specA19 }),

                // #23 iPhone 17 Mist Blue 256gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991169.apple-iphone-17-256gb.jpg", Price = 449890, Description = "iPhone 17 in Mist Blue with 256GB — more space for the things you love.\n\nThe A19 chip and 6.3-inch Super Retina XDR display with 3,000 nits brightness and ProMotion 120Hz make everyday tasks feel effortless. The 48MP Dual Fusion camera captures stunning photos and video, while the 18MP Center Stage front camera keeps your video calls looking sharp.\n\nUp to 26 hours of video playback and fast charging to 50% in 20 minutes. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 49, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMistBlue, spec256gb, specA19 }),

                // #24 iPhone 17 Black 256gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991157.apple-iphone-17-256gb.jpg", Price = 449890, Description = "iPhone 17 in Black with 256GB of storage — built for those who want more without compromise.\n\nThe A19 chip powers a 6.3-inch Super Retina XDR display at 3,000 nits peak brightness with ProMotion 120Hz. The 48MP Dual Fusion camera and 18MP Center Stage front camera deliver outstanding photos and video calls.\n\nUp to 26 hours of video playback. Fast charge to 50% in 20 minutes. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 61, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specBlack, spec256gb, specA19 }),

                // #25 iPhone 17 White 256gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991133.apple-iphone-17-256gb.jpg", Price = 449890, Description = "iPhone 17 in White with 256GB — fresh, functional, and full of performance.\n\nThe A19 chip drives a beautiful 6.3-inch Super Retina XDR display with 3,000 nits peak outdoor brightness and ProMotion 120Hz. Capture every moment with the 48MP Dual Fusion camera and 18MP Center Stage front camera.\n\nUp to 26 hours of video playback and fast charge to 50% in 20 minutes. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 55, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec256gb, specA19 }),

                // #26 iPhone 17 Sage 256gb
                (new Product { Name = "iPhone 17", ImageUrl = "https://p1.akcdn.net/gallery/1236918133/full/2991145.apple-iphone-17-256gb.jpg", Price = 449890, Description = "iPhone 17 in Sage with 256GB — earthy color meets everyday versatility.\n\nThe A19 chip, 6.3-inch Super Retina XDR display with 3,000 nits peak brightness and ProMotion 120Hz, 48MP Dual Fusion camera, and 18MP Center Stage front camera give you everything you need to capture and share your world beautifully.\n\nUp to 26 hours of video playback and fast charging to 50% in 20 minutes. iOS 26. Do more with iPhone.", Discount = 0, StorageQuantity = 43, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSage, spec256gb, specA19 }),

                // #27 iPhone 16e Black 128gb
                (new Product { Name = "iPhone 16e", ImageUrl = "https://p1.akcdn.net/gallery/1176990499/full/2711128.apple-iphone-16e-128gb.jpg", Price = 269890, Description = "Meet iPhone 16e — the most affordable way to experience the power of Apple.\n\nThe A18 chip drives a gorgeous 6.1-inch Super Retina XDR display, and the advanced 48MP camera system captures stunning photos and 4K video in any lighting.\n\nWith up to 26 hours of video playback, USB-C charging, and iOS 26, iPhone 16e is packed with capability at an approachable price.\n\nBlack matte finish. 128GB. The essential iPhone.", Discount = 0, StorageQuantity = 95, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specBlack, spec128gb, specA18 }),

                // #28 iPhone 16e White 128gb
                (new Product { Name = "iPhone 16e", ImageUrl = "https://p1.akcdn.net/gallery/1176990499/full/2711131.apple-iphone-16e-128gb.jpg", Price = 269890, Description = "iPhone 16e in White — the essential iPhone experience in a clean, timeless matte finish.\n\nThe A18 chip powers the 6.1-inch Super Retina XDR display, and the 48MP camera captures beautifully detailed photos and 4K video.\n\nUp to 26 hours of video playback, USB-C, and iOS 26. 128GB. The essential iPhone.", Discount = 0, StorageQuantity = 102, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec128gb, specA18 }),

                // #29 iPhone 16e Black 256gb
                (new Product { Name = "iPhone 16e", ImageUrl = "https://p1.akcdn.net/gallery/1176990499/full/2711128.apple-iphone-16e-128gb.jpg", Price = 339890, Description = "iPhone 16e in Black with 256GB — double the storage, same great value.\n\nThe A18 chip and 6.1-inch Super Retina XDR display make this a capable everyday phone. The 48MP camera handles photos and video with ease.\n\nUp to 26 hours of video playback and USB-C charging. iOS 26. The essential iPhone.", Discount = 0, StorageQuantity = 78, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specBlack, spec256gb, specA18 }),

                // #30 iPhone 16e White 256gb
                (new Product { Name = "iPhone 16e", ImageUrl = "https://p1.akcdn.net/gallery/1176990499/full/2711131.apple-iphone-16e-128gb.jpg", Price = 339890, Description = "iPhone 16e in White with 256GB — a clean look and plenty of room for everything that matters.\n\nThe A18 chip powers the 6.1-inch Super Retina XDR display. The 48MP camera captures beautiful detail.\n\nUp to 26 hours of video playback. USB-C. iOS 26. The essential iPhone.", Discount = 0, StorageQuantity = 69, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec256gb, specA18 }),

                // #2 MacBook Air M5 Silver 512gb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a4c2/NL253a4c2.jpg?width=1000&height=1000", Price = 472690, Description = "The world's most popular laptop gets even better — the MacBook Air with M5 packs exceptional performance and powerful AI capabilities into a thin, light, and durable aluminum design.\n\nAt just 2.7 pounds and 0.44 inches thin, it's as easy to carry as it is to love. The stunning 13.6-inch Liquid Retina display delivers vivid colors and sharp detail at 500 nits of brightness.\n\nThe 10-core CPU and next-generation GPU with Neural Accelerators handle everything from everyday tasks to demanding AI workloads with ease. With up to 18 hours of battery life, a 12MP Center Stage camera, two Thunderbolt 4 ports, and support for up to two external displays, this is the perfect machine for students, creatives, and professionals alike.\n\n16GB unified memory. 512GB SSD. macOS Tahoe. Ready to work, create, and play — anywhere.", Discount = 10, StorageQuantity = 42, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, spec16gb, spec13inch }),

                // #31 MacBook Air M5 Midnight 512gb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a2a2/NL253a2a2.jpg?width=1000&height=1000", Price = 472690, Description = "The MacBook Air in Midnight is a striking choice — dark, sleek, and impossibly thin at just 0.44 inches.\n\nPowered by the M5 chip with a 10-core CPU and next-generation GPU, it handles everything from spreadsheets to AI workloads with ease. The 13.6-inch Liquid Retina display shows rich colors at 500 nits of brightness.\n\nUp to 18 hours of battery life, two Thunderbolt 4 ports, MagSafe charging, and a 12MP Center Stage camera make this the complete package.\n\n16GB unified memory. 512GB SSD. macOS Tahoe. Ready to work, create, and play — anywhere.", Discount = 0, StorageQuantity = 38, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMidnight, spec512gb, spec16gb, spec13inch }),

                // #32 MacBook Air M5 Starlight 512gb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a3c2/NL253a3c2.jpg?width=1000&height=1000", Price = 472690, Description = "The MacBook Air in Starlight brings a warm, golden-silver glow to Apple's most popular laptop.\n\nThe M5 chip — with a 10-core CPU and neural accelerators — handles everyday tasks and demanding AI workloads alike. The 13.6-inch Liquid Retina display shines at 500 nits, and with up to 18 hours of battery life, you'll go all day without plugging in.\n\nTwo Thunderbolt 4 ports, MagSafe, and a 12MP Center Stage camera complete the experience.\n\n16GB unified memory. 512GB SSD. macOS Tahoe. Ready to work, create, and play — anywhere.", Discount = 0, StorageQuantity = 44, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specStarlight, spec512gb, spec16gb, spec13inch }),

                // #33 MacBook Air M5 Sky Blue 512gb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://p1.akcdn.net/full/1551986401.apple-macbook-air-13-m5-mdhh4mg-a.jpg", Price = 472690, Description = "Sky Blue brings a calm, refreshing personality to the MacBook Air.\n\nUnderneath the beautiful finish, the M5 chip delivers exceptional performance for students and professionals alike. The 13.6-inch Liquid Retina display renders vivid colors at 500 nits, while up to 18 hours of battery keeps you going from first class to last meeting.\n\nTwo Thunderbolt 4 ports and MagSafe charging add everyday convenience.\n\n16GB unified memory. 512GB SSD. macOS Tahoe. Ready to work, create, and play — anywhere.", Discount = 0, StorageQuantity = 50, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSkyBlue, spec512gb, spec16gb, spec13inch }),

                // #34 MacBook Air M5 Silver 1tb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a4c2/NL253a4c2.jpg?width=1000&height=1000", Price = 549890, Description = "The MacBook Air in Silver with 1TB is the ideal choice for those who need more room for their creative work.\n\nThe M5 chip handles everyday tasks and AI workloads with remarkable efficiency, all inside a 2.7-pound aluminum body just 0.44 inches thin. The 13.6-inch Liquid Retina display delivers sharp, vivid visuals at 500 nits.\n\nUp to 18 hours of battery life, two Thunderbolt 4 ports, and MagSafe charging keep you productive anywhere.\n\n16GB unified memory. 1TB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 40, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, spec16gb, spec13inch }),

                // #35 MacBook Air M5 Midnight 1tb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a2a2/NL253a2a2.jpg?width=1000&height=1000", Price = 549890, Description = "The MacBook Air in Midnight with 1TB combines a bold, dark aesthetic with extra storage and the everyday efficiency of the M5 chip.\n\nAt just 2.7 pounds and 0.44 inches thin, it slips easily into any bag. The 13.6-inch Liquid Retina display offers vivid color at 500 nits.\n\nUp to 18 hours of battery, two Thunderbolt 4 ports, and MagSafe charging are all included.\n\n16GB unified memory. 1TB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 32, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMidnight, spec1tb, spec16gb, spec13inch }),

                // #36 MacBook Air M5 Starlight 1tb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a3c2/NL253a3c2.jpg?width=1000&height=1000", Price = 549890, Description = "The MacBook Air in Starlight with 1TB is the perfect everyday laptop for students and professionals who need space and performance.\n\nThe M5 chip handles everything from notes to complex AI tasks with grace, inside a 2.7-pound body. The 13.6-inch Liquid Retina display at 500 nits is clear and vibrant.\n\nUp to 18 hours of battery, MagSafe charging, and two Thunderbolt 4 ports round out the experience.\n\n16GB unified memory. 1TB SSD. macOS Tahoe.", Discount = 10, StorageQuantity = 27, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specStarlight, spec1tb, spec16gb, spec13inch }),

                // #37 MacBook Air M5 Sky Blue 1tb 16gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://p1.akcdn.net/full/1551986401.apple-macbook-air-13-m5-mdhh4mg-a.jpg", Price = 549890, Description = "A refreshing color meets more storage. The MacBook Air in Sky Blue with 1TB and the M5 chip is light, capable, and beautiful.\n\nThe 13.6-inch Liquid Retina display shines at 500 nits, and up to 18 hours of battery life means you'll rarely need a charger. MagSafe and two Thunderbolt 4 ports add practical versatility.\n\n16GB unified memory. 1TB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 35, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSkyBlue, spec1tb, spec16gb, spec13inch }),

                // #38 MacBook Air M5 Silver 512gb 24gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a4c2/NL253a4c2.jpg?width=1000&height=1000", Price = 549890, Description = "Step up to 24GB of unified memory in the 13-inch MacBook Air — the ideal choice for developers, designers, and multitaskers.\n\nThe M5 chip with 10-core CPU and next-generation GPU handles even the most demanding workflows. The 13.6-inch Liquid Retina display at 500 nits looks stunning, and up to 18 hours of battery keeps you going all day.\n\nMagSafe and two Thunderbolt 4 ports included.\n\n24GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 29, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, spec24gb, spec13inch }),

                // #39 MacBook Air M5 Midnight 512gb 24gb 13-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a2a2/NL253a2a2.jpg?width=1000&height=1000", Price = 549890, Description = "The 13-inch MacBook Air in Midnight with 24GB unified memory and the M5 chip is built for those who push their machines hard.\n\nCompile, design, edit, and run AI models — it handles everything while staying whisper-quiet. The 13.6-inch Liquid Retina display delivers vivid color at 500 nits.\n\nUp to 18 hours of battery life. MagSafe and two Thunderbolt 4 ports.\n\n24GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 5, StorageQuantity = 24, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMidnight, spec512gb, spec24gb, spec13inch }),

                // #40 MacBook Air M5 Silver 512gb 16gb 15-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a4c2/NL253a4c2.jpg?width=1000&height=1000", Price = 559890, Description = "The 15-inch MacBook Air brings the beloved M5 platform to a bigger, more immersive canvas.\n\nThe stunning 15.3-inch Liquid Retina display at 500 nits is ideal for creative work, presentations, and entertainment. At just 3.3 pounds, it remains remarkably portable.\n\nThe 10-core M5 CPU and next-generation GPU handle everything from office work to AI-assisted creative projects. Up to 18 hours of battery life, MagSafe, two Thunderbolt 4 ports, and a 12MP Center Stage camera.\n\n16GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 35, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, spec16gb, spec15inch }),

                // #41 MacBook Air M5 Midnight 512gb 16gb 15-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL253a2a2/NL253a2a2.jpg?width=1000&height=1000", Price = 559890, Description = "Bigger screen, same iconic design. The 15-inch MacBook Air in Midnight with the M5 chip brings a bold presence and a beautiful 15.3-inch Liquid Retina display with 500 nits of brightness.\n\nAt 3.3 pounds, it's light enough to carry everywhere. The M5 chip handles demanding tasks effortlessly, and up to 18 hours of battery keeps you going.\n\nMagSafe, two Thunderbolt 4 ports, and a 12MP Center Stage camera are all included.\n\n16GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 28, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMidnight, spec512gb, spec16gb, spec15inch }),

                // #42 MacBook Air M5 Starlight 512gb 16gb 15-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL254a3a2/NL254a3a2.jpg?width=1000&height=1000", Price = 559890, Description = "The 15-inch MacBook Air in Starlight is large-screen laptoping at its most elegant.\n\nThe 15.3-inch Liquid Retina display at 500 nits makes photos, videos, and documents look exceptional. The M5 chip with 10-core CPU and neural accelerators powers through demanding workloads while staying completely fanless.\n\nUp to 18 hours of battery life. MagSafe and two Thunderbolt 4 ports. 12MP Center Stage camera.\n\n16GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 22, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specStarlight, spec512gb, spec16gb, spec15inch }),

                // #43 MacBook Air M5 Sky Blue 512gb 16gb 15-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL254a1a2/NL254a1a2.jpg?width=800&height=800", Price = 559890, Description = "The 15-inch MacBook Air in Sky Blue is a bold statement — a large, luminous 15.3-inch Liquid Retina display at 500 nits paired with the power of the M5 chip and a refreshing color.\n\nLight at just 3.3 pounds, it's easy to take anywhere. Up to 18 hours of battery life, MagSafe charging, two Thunderbolt 4 ports, and a 12MP Center Stage camera complete the package.\n\n16GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 19, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSkyBlue, spec512gb, spec16gb, spec15inch }),

                // #44 MacBook Air M5 Silver 512gb 24gb 15-inch
                (new Product { Name = "MacBook Air M5", ImageUrl = "https://image.alza.cz/products/NL254a4a2/NL254a4a2.jpg?width=800&height=800", Price = 634890, Description = "The 15-inch MacBook Air with 24GB of unified memory is a powerhouse for creatives and professionals.\n\nThe 15.3-inch Liquid Retina display at 500 nits provides a stunning workspace, while the M5 chip handles complex video editing, 3D rendering, and AI workloads without breaking a sweat.\n\nUp to 18 hours of battery life, MagSafe charging, two Thunderbolt 4 ports, and 12MP Center Stage.\n\n24GB unified memory. 512GB SSD. macOS Tahoe.", Discount = 0, StorageQuantity = 16, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, spec24gb, spec15inch }),

                // #45 MacBook Pro M5 Silver 1tb 16gb 14-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271d1a2/NL271d1a2.jpg?width=1000&height=1000", Price = 849890, Description = "The MacBook Pro 14-inch with M5 is built for professionals who demand more.\n\nThe breathtaking 14.2-inch Liquid Retina XDR display with ProMotion 120Hz technology, 1,000 nits sustained brightness, and 1600 nits peak HDR brightness sets a new standard for laptop displays.\n\nThe M5 chip with 10-core CPU, 10-core GPU, and 16-core Neural Engine tears through the most demanding creative and development workloads.\n\nThree Thunderbolt 4 ports, HDMI, SD card reader, MagSafe charging, and up to 24 hours of battery life add professional connectivity.\n\n16GB unified memory. 1TB SSD. macOS Tahoe. Pro to the core.", Discount = 0, StorageQuantity = 21, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, spec16gb, spec14inch }),

                // #46 MacBook Pro M5 Space Black 1tb 16gb 14-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271a1j2a/NL271a1j2a.jpg?width=1000&height=1000", Price = 849890, Description = "Space Black — the stunning dark finish exclusive to MacBook Pro.\n\nThe M5 chip with 10-core CPU, 10-core GPU, and 16-core Neural Engine powers a 14.2-inch Liquid Retina XDR display with ProMotion 120Hz. At 1,000 nits sustained and 1600 nits peak HDR, this is the best display ever on a Mac notebook.\n\nThree Thunderbolt 4 ports, HDMI, SD card reader, MagSafe, and up to 24 hours of battery life.\n\n16GB unified memory. 1TB SSD. macOS Tahoe. Pro to the core.", Discount = 5, StorageQuantity = 18, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec1tb, spec16gb, spec14inch }),

                // #47 MacBook Pro M5 Silver 1tb 24gb 14-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271d1a2/NL271d1a2.jpg?width=1000&height=1000", Price = 999890, Description = "MacBook Pro 14-inch in Silver with 24GB unified memory — built for those who work at the cutting edge.\n\nThe M5 chip drives the 14.2-inch Liquid Retina XDR display at ProMotion 120Hz with 1,000 nits sustained and 1600 nits peak HDR brightness.\n\nThree Thunderbolt 4 ports, HDMI, SD card reader, and MagSafe deliver the connectivity professionals need.\n\nUp to 24 hours of battery life. 24GB unified memory. 1TB SSD. macOS Tahoe. Pro to the core.", Discount = 5, StorageQuantity = 13, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, spec24gb, spec14inch }),

                // #48 MacBook Pro M5 Space Black 1tb 24gb 14-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271a1j2a/NL271a1j2a.jpg?width=1000&height=1000", Price = 999890, Description = "The MacBook Pro 14-inch in Space Black with 24GB is the definitive professional laptop.\n\nThe M5 chip with 10-core CPU and 10-core GPU handles 8K video editing, complex simulations, and AI development without missing a beat.\n\nThe 14.2-inch Liquid Retina XDR display with ProMotion 120Hz and 1600 nits peak HDR is simply breathtaking.\n\nThree Thunderbolt 4 ports, HDMI, SD card, MagSafe, and up to 24 hours of battery life. 24GB unified memory. 1TB SSD. macOS Tahoe. Pro to the core.", Discount = 0, StorageQuantity = 10, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec1tb, spec24gb, spec14inch }),

                // #49 MacBook Pro M5 Silver 1tb 24gb 16-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271d2a2/NL271d2a2.jpg?width=800&height=800", Price = 1049890, Description = "The MacBook Pro 16-inch with M5 offers the ultimate canvas for creative work.\n\nThe 16.2-inch Liquid Retina XDR display with ProMotion 120Hz and 1600 nits peak HDR brightness gives you more space to bring your vision to life.\n\nThe M5 chip handles the heaviest video, music, and development workloads with remarkable efficiency.\n\nThree Thunderbolt 5 ports, HDMI, SD card reader, MagSafe, and up to 24 hours of battery life make this the most complete MacBook ever.\n\n24GB unified memory. 1TB SSD. macOS Tahoe. Pro to the core.", Discount = 0, StorageQuantity = 9, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, spec24gb, spec16inch }),

                // #50 MacBook Pro M5 Space Black 1tb 24gb 16-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271e2b2/NL271e2b2.jpg?width=1000&height=1000", Price = 1049890, Description = "The 16-inch MacBook Pro in Space Black is a statement of intent.\n\nThe M5 chip with 10-core CPU, 10-core GPU, and 16-core Neural Engine powers a 16.2-inch Liquid Retina XDR display at ProMotion 120Hz with 1600 nits peak HDR.\n\nThree Thunderbolt 5 ports, HDMI, SD card reader, and MagSafe ensure you're always connected.\n\nUp to 24 hours of battery life. 24GB unified memory. 1TB SSD. macOS Tahoe. Pro to the core.", Discount = 10, StorageQuantity = 8, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec1tb, spec24gb, spec16inch }),

                // #51 MacBook Pro M5 Silver 1tb 48gb 16-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271d2a2/NL271d2a2.jpg?width=800&height=800", Price = 1299890, Description = "For those who push the absolute limits of what a laptop can do.\n\nThe MacBook Pro 16-inch with M5, 48GB unified memory, and 1TB SSD is a workstation in laptop form. The 16.2-inch Liquid Retina XDR display at ProMotion 120Hz and 1600 nits peak HDR is extraordinary.\n\nThe M5 chip handles 3D rendering, AI workflows, and 8K video without compromise.\n\nThree Thunderbolt 5, HDMI, SD card, MagSafe, up to 24 hours of battery. macOS Tahoe. Pro to the core.", Discount = 0, StorageQuantity = 6, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec1tb, spec48gb, spec16inch }),

                // #52 MacBook Pro M5 Space Black 1tb 48gb 16-inch
                (new Product { Name = "MacBook Pro M5", ImageUrl = "https://image.alza.cz/products/NL271e2b2/NL271e2b2.jpg?width=1000&height=1000", Price = 1299890, Description = "The MacBook Pro 16-inch in Space Black with 48GB and 1TB — one of the most powerful notebook configurations Apple offers.\n\nThe M5 chip, 16.2-inch Liquid Retina XDR ProMotion display, and 48GB of unified memory combine to handle the most demanding creative pipelines with ease.\n\nThree Thunderbolt 5, HDMI, SD card reader, MagSafe, and up to 24 hours of battery. macOS Tahoe. Pro to the core.", Discount = 0, StorageQuantity = 5, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec1tb, spec48gb, spec16inch }),

                // #53 MagSafe Charger 1m
                (new Product { Name = "MagSafe Charger 1m", ImageUrl = "https://p1.akcdn.net/gallery/1271129338/full/3106663.apple-mgdm4zm-a.jpg", Price = 14890, Description = "The Apple MagSafe Charger connects magnetically to iPhone for perfect alignment every time, delivering fast wireless charging up to 25W with iPhone 17 series.\n\nThe braided USB-C cable is durable and flexible, rated for years of daily use. Compatible with all MagSafe-enabled iPhones and AirPods with wireless charging case.\n\n1 meter cable length — ideal for nightstand or desk use. USB-C power adapter sold separately.", Discount = 0, StorageQuantity = 120, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec1m }),

                // #54 MagSafe Charger 2m
                (new Product { Name = "MagSafe Charger 2m", ImageUrl = "https://p1.akcdn.net/gallery/1271129338/full/3106663.apple-mgdm4zm-a.jpg", Price = 19890, Description = "The Apple MagSafe Charger with a 2-meter cable gives you the flexibility to charge comfortably from a distance — perfect for bedside tables, sofas, or desks.\n\nMagnetically aligns with iPhone 17 series for fast wireless charging up to 25W. Braided USB-C cable offers durability for years of everyday use.\n\nCompatible with all MagSafe-enabled iPhones and AirPods with wireless charging case. USB-C power adapter sold separately.", Discount = 0, StorageQuantity = 95, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec2m }),

                // #55 Apple USB-C Charge Cable 1m
                (new Product { Name = "Apple USB-C Charge Cable 1m", ImageUrl = "https://img2.oneclick.hu/static_files/product_images/1/10/05/11005694/l/11005694_1.webp", Price = 8990, Description = "The Apple USB-C Charge Cable delivers fast, reliable charging for MacBook, iPad, iPhone, and any USB-C device.\n\nThe braided design offers long-lasting durability and a premium feel. Supports USB 2 data transfer and up to 240W charging with a compatible adapter.\n\n1 meter length. Compatible with all USB-C devices including MacBook Air, MacBook Pro, iPad Pro, and iPhone with USB-C.", Discount = 0, StorageQuantity = 150, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec1m }),

                // #56 Apple USB-C Charge Cable 2m
                (new Product { Name = "Apple USB-C Charge Cable 2m", ImageUrl = "https://img2.oneclick.hu/static_files/product_images/1/10/05/11005694/l/11005694_1.webp", Price = 12990, Description = "For those who need extra reach, the 2-meter Apple USB-C Charge Cable delivers the same fast, reliable charging performance in a longer format.\n\nBraided design for long-lasting durability. Supports up to 240W charging with a compatible adapter and USB 2 data transfer.\n\nCompatible with MacBook, iPad Pro, iPhone with USB-C, and any USB-C device. A simple essential for every Apple setup.", Discount = 0, StorageQuantity = 130, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite, spec2m }),

                // #57 Apple 20W USB-C Power Adapter
                (new Product { Name = "Apple 20W USB-C Power Adapter", ImageUrl = "https://iway.hu/products/161/161828/apple-apple-20w-usb-c-halozati-tolto_1.jpg", Price = 11890, Description = "The compact Apple 20W USB-C Power Adapter delivers fast charging for iPhone and iPad.\n\nPlug it directly into a wall outlet and connect any USB-C cable for reliable, fast power delivery. Compatible with all USB-C devices including iPhone 16e and later, iPad, and AirPods.\n\nSmall enough to fit in any bag or pocket. The essential charger for everyday life.", Discount = 0, StorageQuantity = 180, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #58 Apple 35W Dual USB-C Port Power Adapter
                (new Product { Name = "Apple 35W Dual USB-C Port Power Adapter", ImageUrl = "https://p1.akcdn.net/full/1276055461.apple-mw2k3zm-a.jpg", Price = 19890, Description = "Charge two devices simultaneously with the Apple 35W Dual USB-C Port Power Adapter.\n\nWith two full-speed USB-C ports, you can fast-charge an iPhone and iPad at the same time, or charge your MacBook Air alongside any other device.\n\nCompact, foldable design slips easily into any bag. Compatible with all USB-C devices. The smart charger for a multi-device lifestyle.", Discount = 0, StorageQuantity = 85, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #59 Apple 67W USB-C Power Adapter
                (new Product { Name = "Apple 67W USB-C Power Adapter", ImageUrl = "https://www.mobilehome.hu/img/58534/7156583_altpic_1/7156583.webp?time=1772768543", Price = 21890, Description = "The Apple 67W USB-C Power Adapter delivers fast charging for MacBook Air, MacBook Pro 14-inch, iPad Pro, and iPhone.\n\nCompact enough to travel with and powerful enough to fast-charge a MacBook Air to 50% in around 30 minutes.\n\nFoldable plug design for easy packing. Compatible with all USB-C devices. The essential charger for MacBook users.", Discount = 0, StorageQuantity = 72, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #60 Apple 140W USB-C Power Adapter
                (new Product { Name = "Apple 140W USB-C Power Adapter", ImageUrl = "https://www.mobilehome.hu/img/58534/7156583_altpic_1/7156583.webp?time=1772768543", Price = 27890, Description = "The Apple 140W USB-C Power Adapter is the fastest charger available for MacBook Pro.\n\nCharge your MacBook Pro 16-inch at full speed, or fast-charge two devices simultaneously with a USB-C hub.\n\nThe compact design fits in any bag and the foldable plug makes travel easy. Compatible with all USB-C devices. Power without compromise.", Discount = 15, StorageQuantity = 48, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #61 AirPods 4
                (new Product { Name = "AirPods 4", ImageUrl = "https://p1.akcdn.net/full/1339403959.apple-airpods-4-gen-mxp63zm-a.jpg", Price = 59890, Description = "AirPods 4 deliver a breakthrough listening experience with the H2 chip powering exceptional audio quality, Active Noise Cancellation, and Adaptive Audio that seamlessly blends your music with the world around you.\n\nThe open-ear design fits comfortably without ear tips, and Personalized Spatial Audio creates a three-dimensional soundscape tailored to your ears.\n\nUp to 5 hours of listening time, with over 30 hours total using the USB-C charging case. Siri integration, touch controls, and seamless switching between Apple devices. iOS 26 compatible.", Discount = 0, StorageQuantity = 78, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #62 AirPods 4 with ANC
                (new Product { Name = "AirPods 4 with Active Noise Cancellation", ImageUrl = "https://p1.akcdn.net/full/1339403959.apple-airpods-4-gen-mxp63zm-a.jpg", Price = 79890, Description = "AirPods 4 with Active Noise Cancellation take your listening to a new level.\n\nThe H2 chip delivers powerful ANC and Transparency mode in a lightweight open-ear design — no ear tips required. Adaptive Audio blends noise cancellation with Transparency in real time, responding to your environment automatically.\n\nPersonalized Spatial Audio, touch controls, and hands-free Siri make these AirPods effortlessly smart. Up to 5 hours listening with ANC on, 30+ hours with the case. USB-C charging. iOS 26 compatible.", Discount = 0, StorageQuantity = 64, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #63 AirPods Pro 2
                (new Product { Name = "AirPods Pro 2", ImageUrl = "https://p1.akcdn.net/full/1193325349.apple-airpods-pro-2-mtjv3zm-a-mtjv3ty-a.jpg", Price = 99890, Description = "AirPods Pro 2 with the H2 chip deliver industry-leading Active Noise Cancellation — up to 2× more than the previous generation.\n\nTransparency mode lets in exactly as much of the world as you want, while Personalized Spatial Audio places sound all around you.\n\nThe Hearing Health features include Hearing Protection and a clinical-grade Hearing Test right from your iPhone. Up to 6 hours of listening with ANC on, 30 hours total with the MagSafe charging case.\n\nAdaptive Audio, Conversation Awareness, touch controls, and seamless Apple device switching. iOS 26 compatible.", Discount = 0, StorageQuantity = 55, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specWhite }),

                // #64 AirPods Max Midnight
                (new Product { Name = "AirPods Max", ImageUrl = "https://p1.akcdn.net/gallery/1123721899/full/2569999.apple-airpods-max-2024-mww43zm-a.jpg", Price = 219890, Description = "AirPods Max in Midnight deliver the ultimate over-ear listening experience.\n\nCustom-built dynamic drivers and Apple's H1 chip produce breathtaking sound with industry-leading Active Noise Cancellation. The anodized aluminum ear cups and stainless steel headband are built to last and feel premium in hand.\n\nAdaptive Transparency, Personalized Spatial Audio, and seamless switching between Apple devices make these the smartest headphones on the market.\n\nUp to 20 hours of listening with ANC and Spatial Audio enabled. USB-C charging. iOS 26 compatible.", Discount = 0, StorageQuantity = 23, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMidnight }),

                // #65 AirPods Max Starlight
                (new Product { Name = "AirPods Max", ImageUrl = "https://p1.akcdn.net/gallery/1123721899/full/2569993.apple-airpods-max-2024-mww43zm-a.jpg", Price = 219890, Description = "AirPods Max in Starlight bring premium over-ear audio in an elegant light finish.\n\nThe H1 chip and custom dynamic drivers deliver audiophile-grade sound, while Active Noise Cancellation blocks the outside world so you can focus on your music.\n\nAdaptive Transparency, Personalized Spatial Audio, and instant switching between Apple devices make AirPods Max the most capable headphones Apple has ever made.\n\nUp to 20 hours of listening. USB-C charging. iOS 26 compatible.", Discount = 0, StorageQuantity = 19, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specStarlight }),

                // #66 Apple Watch Series 10 Sport Band Midnight 45mm
                (new Product { Name = "Apple Watch Series 10 Sport Band", ImageUrl = "https://p1.akcdn.net/gallery/1124789701/full/2572486.apple-watch-series-10-gps-42mm.jpg", Price = 19890, Description = "The Apple Watch Sport Band in Midnight offers a comfortable, secure fit for all-day wear.\n\nMade from high-performance fluoroelastomer that is both durable and sweat-resistant, it's ideal for workouts, everyday wear, and everything in between.\n\nCompatible with Apple Watch Series 10 and Apple Watch Ultra 2 in 45mm or 49mm sizes. Easy to swap in seconds with the quick-release pin system. Midnight finish pairs beautifully with any Apple Watch case color.", Discount = 0, StorageQuantity = 88, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specMidnight, spec45mm }),

                // #67 Apple Watch Series 10 Sport Band Starlight 45mm
                (new Product { Name = "Apple Watch Series 10 Sport Band", ImageUrl = "https://p1.akcdn.net/gallery/1124789701/full/2572489.apple-watch-series-10-gps-42mm.jpg", Price = 19890, Description = "The Apple Watch Sport Band in Starlight brings a clean, versatile look to your Apple Watch.\n\nMade from premium fluoroelastomer for comfort and durability through every workout and daily activity. Compatible with Apple Watch Series 10 and Apple Watch Ultra 2 in 45mm or 49mm sizes.\n\nQuick-release pin system makes it easy to change your look in seconds. Lightweight, sweat-resistant, and built to last.", Discount = 15, StorageQuantity = 76, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specStarlight, spec45mm }),

                // #68 Apple Watch Milanese Loop Graphite 45mm
                (new Product { Name = "Apple Watch Milanese Loop", ImageUrl = "https://p1.akcdn.net/gallery/1124789701/full/2572483.apple-watch-series-10-gps-42mm.jpg", Price = 69890, Description = "The Apple Watch Milanese Loop in Graphite is a study in refined elegance.\n\nThe flexible stainless steel mesh drapes smoothly around your wrist and the magnetic closure adjusts to any size for a perfect, comfortable fit.\n\nCompatible with Apple Watch Series 10 in 45mm. The Graphite finish pairs naturally with Space Black Apple Watch cases for a sophisticated, coordinated look. From boardroom to dinner, this band elevates any occasion.", Discount = 0, StorageQuantity = 34, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specGraphite, spec45mm }),

                // #69 Apple Watch Sport Loop Electric Orange 45mm
                (new Product { Name = "Apple Watch Sport Loop", ImageUrl = "https://m.media-amazon.com/images/I/81aYU36fHDL._AC_SL1500_.jpg", Price = 19890, Description = "The Apple Watch Sport Loop in Electric Orange is engineered for active lifestyles.\n\nThe double-layer nylon weave is breathable, lightweight, and comfortable even during intense workouts. The hook-and-loop fastener adjusts easily on the fly and keeps the band firmly in place.\n\nCompatible with Apple Watch Series 10 and Apple Watch Ultra 2 in 45mm or 49mm. Electric Orange adds a vibrant burst of energy to your wrist.", Discount = 0, StorageQuantity = 62, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specElectricOrange, spec45mm }),

                // #70 iPhone 17 Pro Clear Case with MagSafe
                (new Product { Name = "iPhone 17 Pro Clear Case with MagSafe", ImageUrl = "https://images.fizz.hu/api/image/a9f4a3da-c66e-460f-b2e7-92eff461b8e6.jpg?width=2000&height=2000&method=contain", Price = 19890, Description = "Show off the beauty of your iPhone 17 Pro with the Apple Clear Case with MagSafe.\n\nCrafted with a blend of clear polycarbonate and flexible materials with scratch-resistant coating on both the interior and exterior, it protects against minor drops and scratches while keeping your iPhone's color and finish on full display.\n\nBuilt-in magnets align perfectly with MagSafe accessories for fast wireless charging. Compatible with iPhone 17 Pro.", Discount = 15, StorageQuantity = 97, Active = true, CategoryId = 3, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specClear }),

                // #71 MacBook Neo Silver 256gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551985018.apple-macbook-neo-13-a18-pro-mhfa4mg-a.jpg", Price = 179890, Description = "Hello, MacBook Neo — Apple's most affordable Mac ever, starting at an incredible price.\n\nPowered by the A18 Pro chip with a 6-core CPU and 5-core GPU, MacBook Neo flies through everyday tasks like browsing, streaming, photo editing, and AI-powered workflows. It's up to 50% faster than the leading Intel PC laptop and runs macOS Tahoe with full Apple Intelligence support.\n\nThe beautiful 13-inch Liquid Retina display delivers a sharp 2408×1506 resolution at 500 nits of brightness with support for one billion colors. A 1080p FaceTime HD camera, dual side-firing speakers with Spatial Audio, and a dual-mic array make every call and stream look and sound great.\n\nWith up to 16 hours of battery life and a durable recycled aluminum body, MacBook Neo is built for students and everyday users who want the magic of Mac at a surprising price.\n\nSilver. 256GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 85, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec256gb, spec8gb, spec13inch, specA18Pro }),

                // #72 MacBook Neo Blush 256gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551986158.apple-macbook-neo-13-a18-pro-mhfj4mg-a.jpg", Price = 179890, Description = "Hello, MacBook Neo in Blush — a warm, rosy pink that makes the most affordable Mac ever feel anything but entry-level.\n\nThe A18 Pro chip powers everything you love about macOS, from web browsing and streaming to photo editing and Apple Intelligence. The color-matched keyboard completes the look. The 13-inch Liquid Retina display shines at 500 nits with a crisp 2408×1506 resolution.\n\nWith up to 16 hours of battery life, a 1080p FaceTime HD camera, dual side-firing speakers, and a durable recycled aluminum body, MacBook Neo is ready for wherever the day takes you.\n\nBlush. 256GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 72, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specBlush, spec256gb, spec8gb, spec13inch, specA18Pro }),

                // #73 MacBook Neo Citrus 256gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551984958.apple-macbook-neo-13-a18-pro-mhfd4mg-a.jpg", Price = 179890, Description = "Hello, MacBook Neo in Citrus — a fresh, vibrant yellow that brings energy and personality to Apple's most affordable laptop.\n\nThe A18 Pro chip handles everything from everyday tasks to on-device AI workloads, all in complete silence thanks to the fanless design. The color-matched keyboard is a bold statement. The 13-inch Liquid Retina display delivers brilliant visuals at 500 nits.\n\nUp to 16 hours of battery life. 1080p FaceTime HD camera. Dual side-firing speakers with Spatial Audio. Durable recycled aluminum body.\n\nCitrus. 256GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 68, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCitrus, spec256gb, spec8gb, spec13inch, specA18Pro }),

                // #74 MacBook Neo Indigo 256gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551985852.apple-macbook-neo-13-a18-pro-mhfg4mg-a.jpg", Price = 179890, Description = "Hello, MacBook Neo in Indigo — a deep, sophisticated blue that stands apart from every other laptop on the market.\n\nThe A18 Pro chip delivers fast, efficient performance for web browsing, streaming, document creation, and Apple Intelligence features. The color-matched Indigo keyboard ties the whole look together. The 13-inch Liquid Retina display produces vivid, sharp visuals at 500 nits of brightness.\n\nUp to 16 hours of battery life. 1080p FaceTime HD camera. Dual side-firing speakers. Durable recycled aluminum design.\n\nIndigo. 256GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 61, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specIndigo, spec256gb, spec8gb, spec13inch, specA18Pro }),

                // #75 MacBook Neo Silver 512gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551985018.apple-macbook-neo-13-a18-pro-mhfa4mg-a.jpg", Price = 209890, Description = "MacBook Neo in Silver with 512GB — double the storage and Touch ID included, for those who want a little more room to grow.\n\nThe A18 Pro chip keeps everything fast and responsive, whether you're editing photos, juggling tabs, or running Apple Intelligence features. The 13-inch Liquid Retina display is crisp and bright at 500 nits, and with up to 16 hours of battery life, you'll go all day.\n\n1080p FaceTime HD camera, dual side-firing speakers with Spatial Audio, Touch ID power button, and a durable recycled aluminum body.\n\nSilver. 512GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 54, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSilver, spec512gb, spec8gb, spec13inch, specA18Pro }),

                // #76 MacBook Neo Blush 512gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551986158.apple-macbook-neo-13-a18-pro-mhfj4mg-a.jpg", Price = 209890, Description = "MacBook Neo in Blush with 512GB — more storage, Touch ID, and the same gorgeous pink finish that turns heads in any room.\n\nThe A18 Pro chip handles everyday tasks and AI workflows with ease, all in a completely silent fanless design. The 13-inch Liquid Retina display at 500 nits looks stunning, and up to 16 hours of battery life keeps you going from morning to night.\n\n1080p FaceTime HD camera, dual side-firing speakers with Spatial Audio, color-matched keyboard.\n\nBlush. 512GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 46, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specBlush, spec512gb, spec8gb, spec13inch, specA18Pro }),

                // #77 MacBook Neo Citrus 512gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551984958.apple-macbook-neo-13-a18-pro-mhfd4mg-a.jpg", Price = 209890, Description = "MacBook Neo in Citrus with 512GB — bold color, extra storage, and Touch ID included.\n\nThe A18 Pro chip is fast enough for everything you do, from school assignments to photo editing to running the latest AI apps. The 13-inch Liquid Retina display with 500 nits of brightness makes everything look great. Up to 16 hours of battery life. Completely silent, fanless design.\n\n1080p FaceTime HD camera, dual side-firing speakers, color-matched Citrus keyboard.\n\nCitrus. 512GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 39, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCitrus, spec512gb, spec8gb, spec13inch, specA18Pro }),

                // #78 MacBook Neo Indigo 512gb
                (new Product { Name = "MacBook Neo", ImageUrl = "https://p1.akcdn.net/full/1551985852.apple-macbook-neo-13-a18-pro-mhfg4mg-a.jpg", Price = 209890, Description = "MacBook Neo in Indigo with 512GB — the most distinctive MacBook Neo, now with more storage and Touch ID.\n\nThe A18 Pro chip delivers strong everyday performance and full Apple Intelligence support in a completely fanless, silent design. The 13-inch Liquid Retina display looks sharp and bright at 500 nits. Up to 16 hours of battery life, 1080p FaceTime HD camera, dual side-firing speakers with Spatial Audio.\n\nIndigo. 512GB SSD. 8GB unified memory. macOS Tahoe.", Discount = 0, StorageQuantity = 33, Active = true, CategoryId = 2, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specIndigo, spec512gb, spec8gb, spec13inch, specA18Pro }),

                // #79 iPhone Air Sky Blue 256gb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/gallery/1236918157/full/3045139.apple-iphone-air-256gb.jpg", Price = 299890, Description = "iPhone Air is the thinnest iPhone ever made — just 5.6mm thin and weighing only 165 grams, yet packed with the power of the A19 Pro chip.\n\nThe stunning 6.5-inch Super Retina XDR display with ProMotion 120Hz and 3,000 nits of peak outdoor brightness gives you an immersive canvas in an impossibly light package. A polished Grade 5 titanium frame — built with 80% recycled titanium — makes it as strong as it is beautiful.\n\nThe 48MP Fusion camera with 2× Telephoto captures detailed, vibrant photos and 4K video in any light. The 18MP Center Stage front camera keeps you perfectly framed on every call. MagSafe fast wireless charging reaches 50% in 30 minutes.\n\nSky Blue. 256GB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 48, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSkyBlue, spec256gb, specA19Pro }),

                // #80 iPhone Air Cloud White 256gb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/gallery/1236918157/full/3045145.apple-iphone-air-256gb.jpg", Price = 299890, Description = "iPhone Air in Cloud White — pure, elegant, and impossibly thin at just 5.6mm.\n\nThe A19 Pro chip delivers pro-level performance inside the lightest iPhone ever at just 165 grams. The 6.5-inch Super Retina XDR display with ProMotion 120Hz and 3,000 nits peak brightness looks stunning in the polished titanium frame.\n\nCapture beautiful photos and 4K video with the 48MP Fusion camera and 2× Telephoto. The 18MP Center Stage front camera always keeps you in frame. MagSafe fast charging, iOS 26, and all-day battery life.\n\nCloud White. 256GB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 41, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specCloudWhite, spec256gb, specA19Pro }),

                // #81 iPhone Air Light Gold 256gb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/gallery/1236918157/full/3045142.apple-iphone-air-256gb.jpg", Price = 299890, Description = "iPhone Air in Light Gold — a warm, refined finish that perfectly complements the most elegant iPhone design ever.\n\nAt just 5.6mm thin and 165 grams, it's hard to believe how much is packed inside. The A19 Pro chip, a 6.5-inch Super Retina XDR display with ProMotion 120Hz and 3,000 nits peak brightness, and a polished Grade 5 titanium frame make every interaction feel premium.\n\nThe 48MP Fusion camera with 2× Telephoto and 18MP Center Stage front camera ensure every photo and call is exceptional. MagSafe fast charging and all-day battery life.\n\nLight Gold. 256GB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 35, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specLightGold, spec256gb, specA19Pro }),

                // #82 iPhone Air Space Black 256gb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/full/1470426004.apple-iphone-air-256gb.jpg", Price = 299890, Description = "iPhone Air in Space Black — the boldest, most dramatic finish on the thinnest iPhone ever made.\n\nThe A19 Pro chip, polished Grade 5 titanium frame, and 6.5-inch Super Retina XDR display with ProMotion 120Hz and 3,000 nits peak brightness come together in a device that weighs just 165 grams at 5.6mm thin.\n\n48MP Fusion camera with 2× Telephoto for stunning photos and 4K video. 18MP Center Stage front camera for perfect selfies. MagSafe fast charging reaches 50% in 30 minutes.\n\nSpace Black. 256GB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 29, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec256gb, specA19Pro }),

                // #83 iPhone Air Sky Blue 512gb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/gallery/1236918157/full/3045139.apple-iphone-air-256gb.jpg", Price = 359890, Description = "iPhone Air in Sky Blue with 512GB — all the beauty and thinness of the world's most elegant iPhone, now with double the storage.\n\nThe A19 Pro chip and 6.5-inch Super Retina XDR display with ProMotion 120Hz make everything from gaming to video editing effortless. At just 5.6mm and 165 grams in a polished titanium frame, it barely feels like it's there.\n\nThe 48MP Fusion camera with 2× Telephoto, 18MP Center Stage front camera, MagSafe fast charging, and all-day battery life make this the complete package.\n\nSky Blue. 512GB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 22, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSkyBlue, spec512gb, specA19Pro }),

                // #84 iPhone Air Space Black 512gb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/full/1470426004.apple-iphone-air-256gb.jpg", Price = 359890, Description = "iPhone Air in Space Black with 512GB — maximum storage in the most dramatically thin iPhone design ever.\n\nAt just 5.6mm and 165 grams, the A19 Pro chip powers a 6.5-inch Super Retina XDR display with ProMotion 120Hz and 3,000 nits peak brightness inside a polished Grade 5 titanium frame. 48MP Fusion camera with 2× Telephoto, 18MP Center Stage front camera, and MagSafe fast charging complete the package.\n\nSpace Black. 512GB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 16, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec512gb, specA19Pro }),

                // #85 iPhone Air Sky Blue 1tb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/gallery/1236918157/full/3045139.apple-iphone-air-256gb.jpg", Price = 419890, Description = "iPhone Air in Sky Blue with 1TB — for those who want it all, in the thinnest iPhone ever made.\n\nThe A19 Pro chip, 6.5-inch Super Retina XDR display with ProMotion 120Hz, and polished Grade 5 titanium frame at just 5.6mm and 165 grams redefine what a smartphone can be. 1TB of storage means you'll never have to choose what to delete.\n\n48MP Fusion camera with 2× Telephoto, 18MP Center Stage front camera, MagSafe fast charging, all-day battery life.\n\nSky Blue. 1TB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 11, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSkyBlue, spec1tb, specA19Pro }),

                // #86 iPhone Air Space Black 1tb
                (new Product { Name = "iPhone Air", ImageUrl = "https://p1.akcdn.net/full/1470426004.apple-iphone-air-256gb.jpg", Price = 419890, Description = "iPhone Air in Space Black with 1TB — the ultimate configuration of the world's thinnest iPhone.\n\nAt just 5.6mm thin and 165 grams, it's astonishing that 1TB of storage, the A19 Pro chip, and a 6.5-inch Super Retina XDR display with ProMotion 120Hz all fit inside a polished Grade 5 titanium frame. For creators who demand the most.\n\n48MP Fusion camera with 2× Telephoto, 18MP Center Stage front camera, MagSafe fast charging.\n\nSpace Black. 1TB. iOS 26. The thinnest iPhone ever.", Discount = 0, StorageQuantity = 8, Active = true, CategoryId = 1, CreatedAt = now, ModifiedAt = now },
                new List<Spec> { specSpaceBlack, spec1tb, specA19Pro }),
            };

            foreach (var (product, specs) in products)
            {
                context.Products.Add(product);
                context.SaveChanges();

                foreach (var spec in specs)
                {
                    context.ProductSpecs.Add(new SpecProduct
                    {
                        ProductId = product.Id,
                        SpecId = spec.Id
                    });
                }
                context.SaveChanges();
            }
        }
    }
}
